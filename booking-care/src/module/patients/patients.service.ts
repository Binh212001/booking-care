import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from '../../database/repositories/patient.repository';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { PatientReqDto } from './dto/patient.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Patient } from 'src/database/entities';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { userId, ...patientData } = createPatientDto;
    const patient = this.patientRepository.create({
      ...patientData,
    });

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      //create user
      const newUser = this.userRepository.create({
        id: userId,
        username: patientData.fullName,
        email: patientData.email,
        password: await bcrypt.hash(patientData.fullName, 10),
        role: 'patient',
      });
      await this.userRepository.save(newUser);
      patient.user = newUser;
    } else {
      patient.user = user;
    }
    return await this.patientRepository.save(patient);
  }

  async findAll(
    patientReqDto: PatientReqDto,
  ): Promise<OffsetPaginatedDto<Patient>> {
    const { fullName, email, phone, typeMatch, q, order } = patientReqDto;

    const query = this.patientRepository.createQueryBuilder('patient');

    if (q) {
      query.andWhere(
        '(patient.fullName LIKE :q OR patient.email LIKE :q OR patient.phone LIKE :q)',
        { q: `%${q}%` },
      );
    } else {
      if (fullName) {
        if (typeMatch === 'LIKE') {
          query.andWhere('patient.fullName LIKE :fullName', {
            fullName: `%${fullName}%`,
          });
        } else {
          query.andWhere('patient.fullName = :fullName', { fullName });
        }
      }
      if (email) {
        if (typeMatch === 'LIKE') {
          query.andWhere('patient.email LIKE :email', { email: `%${email}%` });
        } else {
          query.andWhere('patient.email = :email', { email });
        }
      }
      if (phone) {
        if (typeMatch === 'LIKE') {
          query.andWhere('patient.phone LIKE :phone', { phone: `%${phone}%` });
        } else {
          query.andWhere('patient.phone = :phone', { phone });
        }
      }
    }

    query.orderBy('patient.createdAt', order || 'ASC');

    const [data, metaDto] = await paginate(query, patientReqDto, {
      skipCount: false,
      takeAll: patientReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Patient>(data, metaDto);
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
    Object.assign(patient, updatePatientDto);
    return await this.patientRepository.save(patient);
  }

  async remove(id: string) {
    const patient = await this.findOne(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    } else {
      await this.userRepository.softDelete(patient.user.id);
      return await this.patientRepository.softDelete(id);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from '../../database/repositories/patient.repository';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import * as bcrypt from 'bcrypt';

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

  async findAll() {
    return await this.patientRepository.find({});
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

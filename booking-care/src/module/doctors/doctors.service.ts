import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OffsetPaginationDto } from 'src/common/offset-pagination/offset-pagination.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { UserRepository } from 'src/database/repositories/user.repository';
import { DepartmentRepository } from '../../database/repositories/department.repository';
import { DoctorRepository } from '../../database/repositories/doctor.repository';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorReqDto } from './dto/doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Doctor } from 'src/database/entities';
import { PresignedUrlDto } from 'src/common/presigned-url.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private readonly departmentRepository: DepartmentRepository,
    private readonly userRepository: UserRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { departmentId, ...doctorData } = createDoctorDto;

    const doctorCode = await this.generateDoctorCode();

    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });

    if (!department) {
      throw new BadRequestException(
        `Department with ID ${departmentId} not found`,
      );
    }

    const newDoctor = this.doctorRepository.create({
      code: doctorCode,
      ...doctorData,
      department,
    });
    //create user
    const newUser = this.userRepository.create({
      username: doctorData.fullName,
      email: doctorData.email,
      password: await bcrypt.hash(doctorData.fullName, 10),
      role: 'doctor',
    });
    const savedUser = await this.userRepository.save(newUser);
    newDoctor.user = savedUser;

    return await this.doctorRepository.save(newDoctor);
  }

  async findAll(
    doctorReqDto: DoctorReqDto,
  ): Promise<OffsetPaginatedDto<Doctor>> {
    const { q, order } = doctorReqDto;

    const query = this.doctorRepository.createQueryBuilder('doctor');

    if (q) {
      query.andWhere(
        '(doctor.fullName ILIKE :q OR doctor.email ILIKE :q OR doctor.phone ILIKE :q)',
        { q: `%${q}%` },
      );
    }

    const [base, metaDto] = await paginate(query, doctorReqDto, {
      skipCount: false,
      takeAll: doctorReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Doctor>(base, metaDto);
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: [
        'department',
        'user',
        'appointments',
        'medicalRecords',
        'prescriptions',
      ],
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    const { departmentId, ...doctorData } = updateDoctorDto;
    if (departmentId) {
      const department = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
      if (!department) {
        throw new NotFoundException(
          `Department with ID ${departmentId} not found`,
        );
      }
      doctor.department = department;
    }
    Object.assign(doctor, doctorData);
    return await this.doctorRepository.save(doctor);
  }

  async remove(id: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return await this.doctorRepository.softDelete(id);
  }

  async generateDoctorCode() {
    const randomDigits =
      'DOC' + Math.floor(10000 + Math.random() * 90000).toString(); // luôn 5 số
    const codeExists = await this.doctorRepository.exists({
      where: { code: `${randomDigits}` },
    });
    if (codeExists) {
      return this.generateDoctorCode();
    }
    return randomDigits;
  }
}

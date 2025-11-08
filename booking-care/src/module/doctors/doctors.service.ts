import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorRepository } from '../../database/repositories/doctor.repository';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DepartmentRepository } from '../../database/repositories/department.repository';
import { UserRepository } from 'src/database/repositories/user.repository';
import { AppointmentRepository } from 'src/database/repositories/appointment.repository';
import dayjs from 'dayjs';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private readonly departmentRepository: DepartmentRepository,
    private readonly userRepository: UserRepository,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { userId, departmentId, ...doctorData } = createDoctorDto;

    const doctorCode = await this.generateDoctorCode();

    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newDoctor = this.doctorRepository.create({
      code: doctorCode,
      ...doctorData,
      department,
      user,
    });

    return await this.doctorRepository.save(newDoctor);
  }

  async findAll() {
    return await this.doctorRepository.find({
      relations: [
        'department',
        'user',
        'appointments',
        'medicalRecords',
        'prescriptions',
      ],
    });
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: [
        'department',
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
    const { userId, departmentId, ...doctorData } = updateDoctorDto;
    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      doctor.user = user;
    }
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DoctorRepository } from '../../database/repositories/doctor.repository';
import { Doctor } from '../../database/entities/doctor.entity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { DepartmentRepository } from 'src/database/repositories/department.repository';
import { AppointmentRepository } from 'src/database/repositories/appointment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorsController],
  providers: [
    DoctorsService,
    DoctorRepository,
    UserRepository,
    DepartmentRepository,
    AppointmentRepository,
  ],
  exports: [DoctorsService, DoctorRepository],
})
export class DoctorsModule {}

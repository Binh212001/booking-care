import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from 'src/database/repositories/appointment.repository';
import { DepartmentRepository } from 'src/database/repositories/department.repository';
import { UserRepository } from 'src/database/repositories/user.repository';
import { Doctor } from '../../database/entities/doctor.entity';
import { DoctorRepository } from '../../database/repositories/doctor.repository';
import { AwsModule } from '../s3/aws.module';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), AwsModule],
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

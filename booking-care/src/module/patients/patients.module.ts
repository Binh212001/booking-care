import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientRepository } from '../../database/repositories/patient.repository';
import { Patient } from '../../database/entities/patient.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), UsersModule],
  controllers: [PatientsController],
  providers: [PatientsService, PatientRepository],
  exports: [PatientsService, PatientRepository],
})
export class PatientsModule {}

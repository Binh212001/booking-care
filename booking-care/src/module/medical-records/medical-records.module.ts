import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { MedicalRecordRepository } from '../../database/repositories/medical-record.repository';
import { MedicalRecord } from '../../database/entities/medical-record.entity';
import { AppointmentsModule } from '../appointments/appointments.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord]),
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService, MedicalRecordRepository],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}

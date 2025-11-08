import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionRepository } from '../../database/repositories/prescription.repository';
import { Prescription } from '../../database/entities/prescription.entity';
import { PatientsModule } from '../patients/patients.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription]),
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService, PrescriptionRepository],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/database.service';
import { AppointmentsModule } from './module/appointments/appointments.module';
import { DepartmentsModule } from './module/departments/departments.module';
import { DoctorsModule } from './module/doctors/doctors.module';
import { MedicalRecordsModule } from './module/medical-records/medical-records.module';
import { MedicinesModule } from './module/medicines/medicines.module';
import { PatientsModule } from './module/patients/patients.module';
import { PrescriptionMedicinesModule } from './module/prescription-medicines/prescription-medicines.module';
import { PrescriptionsModule } from './module/prescriptions/prescriptions.module';
import { ServicesModule } from './module/services/services.module';
import { TreatmentsModule } from './module/treatments/treatments.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    DepartmentsModule,
    DoctorsModule,
    PatientsModule,
    ServicesModule,
    MedicinesModule,
    AppointmentsModule,
    MedicalRecordsModule,
    TreatmentsModule,
    PrescriptionsModule,
    PrescriptionMedicinesModule,
    UsersModule,
  ],
  providers: [TypeOrmConfigService],
  controllers: [],
})
export class AppModule {}

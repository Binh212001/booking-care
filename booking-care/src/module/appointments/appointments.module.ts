import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentRepository } from '../../database/repositories/appointment.repository';
import { Appointment } from '../../database/entities/appointment.entity';
import { DoctorsModule } from '../doctors/doctors.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DoctorsModule,
    ServicesModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentRepository],
  exports: [AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}

import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Appointment } from '../entities/appointment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AppointmentRepository extends BaseRepository<Appointment> {
  constructor(private readonly dataSource: DataSource) {
    super(Appointment, dataSource.createEntityManager());
  }
}


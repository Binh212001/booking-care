import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Doctor } from '../entities/doctor.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DoctorRepository extends BaseRepository<Doctor> {
  constructor(private readonly dataSource: DataSource) {
    super(Doctor, dataSource.createEntityManager());
  }
}

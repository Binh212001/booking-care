import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Patient } from '../entities/patient.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PatientRepository extends BaseRepository<Patient> {
  constructor(private readonly dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }
}


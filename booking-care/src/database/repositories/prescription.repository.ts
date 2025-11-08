import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Prescription } from '../entities/prescription.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PrescriptionRepository extends BaseRepository<Prescription> {
  constructor(private readonly dataSource: DataSource) {
    super(Prescription, dataSource.createEntityManager());
  }
}


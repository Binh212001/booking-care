import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Treatment } from '../entities/treatment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TreatmentRepository extends BaseRepository<Treatment> {
  constructor(private readonly dataSource: DataSource) {
    super(Treatment, dataSource.createEntityManager());
  }
}


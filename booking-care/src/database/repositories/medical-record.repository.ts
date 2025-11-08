import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { MedicalRecord } from '../entities/medical-record.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MedicalRecordRepository extends BaseRepository<MedicalRecord> {
  constructor(private readonly dataSource: DataSource) {
    super(MedicalRecord, dataSource.createEntityManager());
  }
}


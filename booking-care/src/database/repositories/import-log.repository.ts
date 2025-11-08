import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { ImportLogs } from '../entities/import-logs.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ImportLogRepository extends BaseRepository<ImportLogs> {
  constructor(private readonly dataSource: DataSource) {
    super(ImportLogs, dataSource.createEntityManager());
  }
}

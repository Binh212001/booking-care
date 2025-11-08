import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Service } from '../entities/service.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ServiceRepository extends BaseRepository<Service> {
  constructor(private readonly dataSource: DataSource) {
    super(Service, dataSource.createEntityManager());
  }
}


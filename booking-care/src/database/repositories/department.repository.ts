import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Department } from '../entities/department.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DepartmentRepository extends BaseRepository<Department> {
  constructor(private readonly dataSource: DataSource) {
    super(Department, dataSource.createEntityManager());
  }
}


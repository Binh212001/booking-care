import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { Medicine } from '../entities/medicine.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MedicineRepository extends BaseRepository<Medicine> {
  constructor(private readonly dataSource: DataSource) {
    super(Medicine, dataSource.createEntityManager());
  }
}


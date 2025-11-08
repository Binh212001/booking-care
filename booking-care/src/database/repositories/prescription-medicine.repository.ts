import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base.repository';
import { PrescriptionMedicine } from '../entities/prescription-medicine.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PrescriptionMedicineRepository extends BaseRepository<PrescriptionMedicine> {
  constructor(private readonly dataSource: DataSource) {
    super(PrescriptionMedicine, dataSource.createEntityManager());
  }
}


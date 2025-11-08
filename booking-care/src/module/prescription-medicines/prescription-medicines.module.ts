import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionMedicinesService } from './prescription-medicines.service';
import { PrescriptionMedicinesController } from './prescription-medicines.controller';
import { PrescriptionMedicineRepository } from '../../database/repositories/prescription-medicine.repository';
import { PrescriptionMedicine } from '../../database/entities/prescription-medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionMedicine])],
  controllers: [PrescriptionMedicinesController],
  providers: [PrescriptionMedicinesService, PrescriptionMedicineRepository],
  exports: [PrescriptionMedicinesService],
})
export class PrescriptionMedicinesModule {}


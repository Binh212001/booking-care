import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { MedicineRepository } from '../../database/repositories/medicine.repository';
import { Medicine } from '../../database/entities/medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  controllers: [MedicinesController],
  providers: [MedicinesService, MedicineRepository],
  exports: [MedicinesService],
})
export class MedicinesModule {}


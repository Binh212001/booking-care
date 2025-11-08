import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentsService } from './treatments.service';
import { TreatmentsController } from './treatments.controller';
import { TreatmentRepository } from '../../database/repositories/treatment.repository';
import { Treatment } from '../../database/entities/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment])],
  controllers: [TreatmentsController],
  providers: [TreatmentsService, TreatmentRepository],
  exports: [TreatmentsService],
})
export class TreatmentsModule {}


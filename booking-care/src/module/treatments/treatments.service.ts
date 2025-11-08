import { Injectable, NotFoundException } from '@nestjs/common';
import { TreatmentRepository } from '../../database/repositories/treatment.repository';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentsService {
  constructor(private readonly treatmentRepository: TreatmentRepository) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    return await this.treatmentRepository.save(createTreatmentDto);
  }

  async findAll() {
    return await this.treatmentRepository.find({
      relations: ['medicalRecord', 'doctor'],
    });
  }

  async findOne(id: string) {
    const treatment = await this.treatmentRepository.findOne({
      where: { id },
      relations: ['medicalRecord', 'doctor'],
    });

    if (!treatment) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }

    return treatment;
  }

  async update(id: string, updateTreatmentDto: UpdateTreatmentDto) {
    const treatment = await this.findOne(id);
    Object.assign(treatment, updateTreatmentDto);
    return await this.treatmentRepository.save(treatment);
  }

  async remove(id: string) {
    const treatment = await this.findOne(id);
    return await this.treatmentRepository.softDelete(id);
  }
}


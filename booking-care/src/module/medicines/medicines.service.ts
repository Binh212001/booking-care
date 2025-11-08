import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicineRepository } from '../../database/repositories/medicine.repository';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicinesService {
  constructor(private readonly medicineRepository: MedicineRepository) {}

  async create(createMedicineDto: CreateMedicineDto) {
    return await this.medicineRepository.save(createMedicineDto);
  }

  async findAll() {
    return await this.medicineRepository.find({
      relations: ['prescriptionMedicines'],
    });
  }

  async findOne(id: string) {
    const medicine = await this.medicineRepository.findOne({
      where: { id },
      relations: ['prescriptionMedicines'],
    });

    if (!medicine) {
      throw new NotFoundException(`Medicine with ID ${id} not found`);
    }

    return medicine;
  }

  async update(id: string, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.findOne(id);
    Object.assign(medicine, updateMedicineDto);
    return await this.medicineRepository.save(medicine);
  }

  async remove(id: string) {
    const medicine = await this.findOne(id);
    return await this.medicineRepository.softDelete(id);
  }
}


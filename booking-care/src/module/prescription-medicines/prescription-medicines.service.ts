import { Injectable, NotFoundException } from '@nestjs/common';
import { PrescriptionMedicineRepository } from '../../database/repositories/prescription-medicine.repository';
import { CreatePrescriptionMedicineDto } from './dto/create-prescription-medicine.dto';
import { UpdatePrescriptionMedicineDto } from './dto/update-prescription-medicine.dto';

@Injectable()
export class PrescriptionMedicinesService {
  constructor(private readonly prescriptionMedicineRepository: PrescriptionMedicineRepository) {}

  async create(createPrescriptionMedicineDto: CreatePrescriptionMedicineDto) {
    return await this.prescriptionMedicineRepository.save(createPrescriptionMedicineDto);
  }

  async findAll() {
    return await this.prescriptionMedicineRepository.find({
      relations: ['prescription', 'medicine'],
    });
  }

  async findOne(id: string) {
    const prescriptionMedicine = await this.prescriptionMedicineRepository.findOne({
      where: { id },
      relations: ['prescription', 'medicine'],
    });

    if (!prescriptionMedicine) {
      throw new NotFoundException(`Prescription medicine with ID ${id} not found`);
    }

    return prescriptionMedicine;
  }

  async update(id: string, updatePrescriptionMedicineDto: UpdatePrescriptionMedicineDto) {
    const prescriptionMedicine = await this.findOne(id);
    Object.assign(prescriptionMedicine, updatePrescriptionMedicineDto);
    return await this.prescriptionMedicineRepository.save(prescriptionMedicine);
  }

  async remove(id: string) {
    const prescriptionMedicine = await this.findOne(id);
    return await this.prescriptionMedicineRepository.softDelete(id);
  }
}


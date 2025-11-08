import { Injectable, NotFoundException } from '@nestjs/common';
import { PrescriptionMedicineRepository } from '../../database/repositories/prescription-medicine.repository';
import { CreatePrescriptionMedicineDto } from './dto/create-prescription-medicine.dto';
import { UpdatePrescriptionMedicineDto } from './dto/update-prescription-medicine.dto';
import { PrescriptionMedicineReqDto } from './dto/prescription-medicine.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { PrescriptionMedicine } from 'src/database/entities';

@Injectable()
export class PrescriptionMedicinesService {
  constructor(private readonly prescriptionMedicineRepository: PrescriptionMedicineRepository) {}

  async create(createPrescriptionMedicineDto: CreatePrescriptionMedicineDto) {
    return await this.prescriptionMedicineRepository.save(createPrescriptionMedicineDto);
  }

  async findAll(
    prescriptionMedicineReqDto: PrescriptionMedicineReqDto,
  ): Promise<OffsetPaginatedDto<PrescriptionMedicine>> {
    const { prescriptionId, medicineId, order } = prescriptionMedicineReqDto;

    const query = this.prescriptionMedicineRepository
      .createQueryBuilder('prescriptionMedicine')
      .leftJoinAndSelect('prescriptionMedicine.prescription', 'prescription')
      .leftJoinAndSelect('prescriptionMedicine.medicine', 'medicine');

    if (prescriptionId) {
      query.andWhere('prescriptionMedicine.prescriptionId = :prescriptionId', {
        prescriptionId,
      });
    }
    if (medicineId) {
      query.andWhere('prescriptionMedicine.medicineId = :medicineId', {
        medicineId,
      });
    }

    query.orderBy('prescriptionMedicine.createdAt', order || 'ASC');

    const [data, metaDto] = await paginate(query, prescriptionMedicineReqDto, {
      skipCount: false,
      takeAll: prescriptionMedicineReqDto.takeAll,
    });

    return new OffsetPaginatedDto<PrescriptionMedicine>(data, metaDto);
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


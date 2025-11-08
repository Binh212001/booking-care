import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicineRepository } from '../../database/repositories/medicine.repository';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineReqDto } from './dto/medicine.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Medicine } from 'src/database/entities';

@Injectable()
export class MedicinesService {
  constructor(private readonly medicineRepository: MedicineRepository) {}

  async create(createMedicineDto: CreateMedicineDto) {
    return await this.medicineRepository.save(createMedicineDto);
  }

  async findAll(
    medicineReqDto: MedicineReqDto,
  ): Promise<OffsetPaginatedDto<Medicine>> {
    const { name, manufacturer, typeMatch, q, order } = medicineReqDto;

    const query = this.medicineRepository
      .createQueryBuilder('medicine')
      .leftJoinAndSelect('medicine.prescriptionMedicines', 'prescriptionMedicines');

    if (q) {
      query.andWhere(
        '(medicine.name LIKE :q OR medicine.manufacturer LIKE :q)',
        { q: `%${q}%` },
      );
    } else {
      if (name) {
        if (typeMatch === 'LIKE') {
          query.andWhere('medicine.name LIKE :name', { name: `%${name}%` });
        } else {
          query.andWhere('medicine.name = :name', { name });
        }
      }
      if (manufacturer) {
        if (typeMatch === 'LIKE') {
          query.andWhere('medicine.manufacturer LIKE :manufacturer', {
            manufacturer: `%${manufacturer}%`,
          });
        } else {
          query.andWhere('medicine.manufacturer = :manufacturer', {
            manufacturer,
          });
        }
      }
    }

    query.orderBy('medicine.createdAt', order || 'ASC');

    const [data, metaDto] = await paginate(query, medicineReqDto, {
      skipCount: false,
      takeAll: medicineReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Medicine>(data, metaDto);
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


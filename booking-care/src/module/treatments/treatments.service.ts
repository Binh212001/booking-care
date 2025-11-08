import { Injectable, NotFoundException } from '@nestjs/common';
import { TreatmentRepository } from '../../database/repositories/treatment.repository';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { TreatmentReqDto } from './dto/treatment.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Treatment } from 'src/database/entities';

@Injectable()
export class TreatmentsService {
  constructor(private readonly treatmentRepository: TreatmentRepository) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    return await this.treatmentRepository.save(createTreatmentDto);
  }

  async findAll(
    treatmentReqDto: TreatmentReqDto,
  ): Promise<OffsetPaginatedDto<Treatment>> {
    const { page, limit, order, medicalRecordId } = treatmentReqDto;

    const where: any = {};

    if (medicalRecordId) where.medicalRecord = { id: medicalRecordId };

    const query = this.treatmentRepository
      .createQueryBuilder('treatment')
      .leftJoinAndSelect('treatment.medicalRecord', 'medicalRecord')
      .leftJoinAndSelect('treatment.doctor', 'doctor');

    if (medicalRecordId) {
      query.andWhere('treatment.medicalRecordId = :medicalRecordId', {
        medicalRecordId,
      });
    }

    const [data, metaDto] = await paginate(query, treatmentReqDto, {
      skipCount: false,
      takeAll: treatmentReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Treatment>(data, metaDto);
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

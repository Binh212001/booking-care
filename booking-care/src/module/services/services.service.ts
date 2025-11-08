import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../../database/repositories/service.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceReqDto } from './dto/service.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Service } from 'src/database/entities';

@Injectable()
export class ServicesService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceRepository.save(createServiceDto);
  }

  async findAll(
    serviceReqDto: ServiceReqDto,
  ): Promise<OffsetPaginatedDto<Service>> {
    const { name, description, typeMatch, q, order } = serviceReqDto;

    const query = this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.appointments', 'appointments');

    if (q) {
      query.andWhere(
        '(service.name LIKE :q OR service.description LIKE :q)',
        { q: `%${q}%` },
      );
    } else {
      if (name) {
        if (typeMatch === 'LIKE') {
          query.andWhere('service.name LIKE :name', { name: `%${name}%` });
        } else {
          query.andWhere('service.name = :name', { name });
        }
      }
      if (description) {
        if (typeMatch === 'LIKE') {
          query.andWhere('service.description LIKE :description', {
            description: `%${description}%`,
          });
        } else {
          query.andWhere('service.description = :description', {
            description,
          });
        }
      }
    }

    query.orderBy('service.createdAt', order || 'ASC');

    const [data, metaDto] = await paginate(query, serviceReqDto, {
      skipCount: false,
      takeAll: serviceReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Service>(data, metaDto);
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['appointments'],
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    Object.assign(service, updateServiceDto);
    return await this.serviceRepository.save(service);
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    return await this.serviceRepository.softDelete(id);
  }
}


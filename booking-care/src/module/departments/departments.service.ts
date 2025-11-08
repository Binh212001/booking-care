import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from '../../database/repositories/department.repository';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentReqDto } from './dto/department.dto';
import { paginate } from 'src/common/offset-pagination/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Department } from 'src/database/entities';

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentRepository.save(createDepartmentDto);
  }

  async findAll(
    departmentReqDto: DepartmentReqDto,
  ): Promise<OffsetPaginatedDto<Department>> {
    const { name, description, typeMatch, q, order } = departmentReqDto;

    const query = this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.doctors', 'doctors');

    if (q) {
      query.andWhere(
        '(department.name LIKE :q OR department.description LIKE :q)',
        { q: `%${q}%` },
      );
    } else {
      if (name) {
        if (typeMatch === 'LIKE') {
          query.andWhere('department.name LIKE :name', { name: `%${name}%` });
        } else {
          query.andWhere('department.name = :name', { name });
        }
      }
      if (description) {
        if (typeMatch === 'LIKE') {
          query.andWhere('department.description LIKE :description', {
            description: `%${description}%`,
          });
        } else {
          query.andWhere('department.description = :description', {
            description,
          });
        }
      }
    }

    query.orderBy('department.createdAt', order || 'ASC');

    const [data, metaDto] = await paginate(query, departmentReqDto, {
      skipCount: false,
      takeAll: departmentReqDto.takeAll,
    });

    return new OffsetPaginatedDto<Department>(data, metaDto);
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['doctors'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.findOne(id);
    Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async remove(id: string) {
    const department = await this.findOne(id);
    return await this.departmentRepository.softDelete(id);
  }
}

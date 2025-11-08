import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentReqDto } from './dto/department.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Department } from 'src/database/entities';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới khoa' })
  @ApiResponse({ status: 201, description: 'Tạo khoa thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả khoa' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách khoa thành công' })
  findAll(
    @Query() departmentReqDto: DepartmentReqDto,
  ): Promise<OffsetPaginatedDto<Department>> {
    return this.departmentsService.findAll(departmentReqDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin khoa theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin khoa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khoa' })
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin khoa' })
  @ApiResponse({ status: 200, description: 'Cập nhật khoa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khoa' })
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa khoa' })
  @ApiResponse({ status: 204, description: 'Xóa khoa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khoa' })
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}


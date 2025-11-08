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
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { MedicineReqDto } from './dto/medicine.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Medicine } from 'src/database/entities';

@ApiTags('Medicines')
@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới thuốc' })
  @ApiResponse({ status: 201, description: 'Tạo thuốc thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả thuốc' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thuốc thành công' })
  findAll(
    @Query() medicineReqDto: MedicineReqDto,
  ): Promise<OffsetPaginatedDto<Medicine>> {
    return this.medicinesService.findAll(medicineReqDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thuốc theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thuốc' })
  findOne(@Param('id') id: string) {
    return this.medicinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin thuốc' })
  @ApiResponse({ status: 200, description: 'Cập nhật thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thuốc' })
  update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa thuốc' })
  @ApiResponse({ status: 204, description: 'Xóa thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thuốc' })
  remove(@Param('id') id: string) {
    return this.medicinesService.remove(id);
  }
}


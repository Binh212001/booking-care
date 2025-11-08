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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrescriptionMedicinesService } from './prescription-medicines.service';
import { CreatePrescriptionMedicineDto } from './dto/create-prescription-medicine.dto';
import { UpdatePrescriptionMedicineDto } from './dto/update-prescription-medicine.dto';

@ApiTags('Prescription Medicines')
@Controller('prescription-medicines')
export class PrescriptionMedicinesController {
  constructor(private readonly prescriptionMedicinesService: PrescriptionMedicinesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới thuốc trong đơn thuốc' })
  @ApiResponse({ status: 201, description: 'Tạo thuốc trong đơn thuốc thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createPrescriptionMedicineDto: CreatePrescriptionMedicineDto) {
    return this.prescriptionMedicinesService.create(createPrescriptionMedicineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả thuốc trong đơn thuốc' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thuốc trong đơn thuốc thành công' })
  findAll() {
    return this.prescriptionMedicinesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thuốc trong đơn thuốc theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thuốc trong đơn thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thuốc trong đơn thuốc' })
  findOne(@Param('id') id: string) {
    return this.prescriptionMedicinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin thuốc trong đơn thuốc' })
  @ApiResponse({ status: 200, description: 'Cập nhật thuốc trong đơn thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thuốc trong đơn thuốc' })
  update(@Param('id') id: string, @Body() updatePrescriptionMedicineDto: UpdatePrescriptionMedicineDto) {
    return this.prescriptionMedicinesService.update(id, updatePrescriptionMedicineDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa thuốc trong đơn thuốc' })
  @ApiResponse({ status: 204, description: 'Xóa thuốc trong đơn thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thuốc trong đơn thuốc' })
  remove(@Param('id') id: string) {
    return this.prescriptionMedicinesService.remove(id);
  }
}


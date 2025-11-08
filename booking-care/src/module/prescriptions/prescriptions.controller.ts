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
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionReqDto } from './dto/prescription.dto';
import { Doctor } from 'src/database/entities/doctor.entity';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Prescription } from 'src/database/entities/prescription.entity';

@ApiTags('Prescriptions')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới đơn thuốc' })
  @ApiResponse({ status: 201, description: 'Tạo đơn thuốc thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả đơn thuốc' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách đơn thuốc thành công',
  })
  findAll(
    @Query() prescriptionReqDto: PrescriptionReqDto,
  ): Promise<OffsetPaginatedDto<Prescription>> {
    return this.prescriptionsService.findAll(prescriptionReqDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin đơn thuốc theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin đơn thuốc thành công',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn thuốc' })
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin đơn thuốc' })
  @ApiResponse({ status: 200, description: 'Cập nhật đơn thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn thuốc' })
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionsService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa đơn thuốc' })
  @ApiResponse({ status: 204, description: 'Xóa đơn thuốc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn thuốc' })
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(id);
  }
}

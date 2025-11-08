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
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { MedicalRecordReqDto } from './dto/medical-record.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { MedicalRecord } from 'src/database/entities';

@ApiTags('Medical Records')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới hồ sơ bệnh án' })
  @ApiResponse({ status: 201, description: 'Tạo hồ sơ bệnh án thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả hồ sơ bệnh án' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách hồ sơ bệnh án thành công',
  })
  findAll(
    @Query() medicalRecordReqDto: MedicalRecordReqDto,
  ): Promise<OffsetPaginatedDto<MedicalRecord>> {
    return this.medicalRecordsService.findAll(medicalRecordReqDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin hồ sơ bệnh án theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin hồ sơ bệnh án thành công',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy hồ sơ bệnh án' })
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin hồ sơ bệnh án' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật hồ sơ bệnh án thành công',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy hồ sơ bệnh án' })
  update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.update(id, updateMedicalRecordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa hồ sơ bệnh án' })
  @ApiResponse({ status: 204, description: 'Xóa hồ sơ bệnh án thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy hồ sơ bệnh án' })
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(id);
  }
}

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
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới bệnh nhân' })
  @ApiResponse({ status: 201, description: 'Tạo bệnh nhân thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bệnh nhân' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bệnh nhân thành công',
  })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin bệnh nhân theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin bệnh nhân thành công',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bệnh nhân' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin bệnh nhân' })
  @ApiResponse({ status: 200, description: 'Cập nhật bệnh nhân thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bệnh nhân' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa bệnh nhân' })
  @ApiResponse({ status: 204, description: 'Xóa bệnh nhân thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bệnh nhân' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}

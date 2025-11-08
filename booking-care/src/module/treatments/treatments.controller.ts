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
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@ApiTags('Treatments')
@Controller('treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới điều trị' })
  @ApiResponse({ status: 201, description: 'Tạo điều trị thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentsService.create(createTreatmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả điều trị' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách điều trị thành công' })
  findAll() {
    return this.treatmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin điều trị theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin điều trị thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy điều trị' })
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin điều trị' })
  @ApiResponse({ status: 200, description: 'Cập nhật điều trị thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy điều trị' })
  update(@Param('id') id: string, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentsService.update(id, updateTreatmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa điều trị' })
  @ApiResponse({ status: 204, description: 'Xóa điều trị thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy điều trị' })
  remove(@Param('id') id: string) {
    return this.treatmentsService.remove(id);
  }
}


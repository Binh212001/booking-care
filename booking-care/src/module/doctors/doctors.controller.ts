import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Doctor } from 'src/database/entities';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorReqDto } from './dto/doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới bác sĩ' })
  @ApiResponse({ status: 201, description: 'Tạo bác sĩ thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bác sĩ' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách bác sĩ thành công' })
  findAll(
    @Query() doctorReqDto: DoctorReqDto,
  ): Promise<OffsetPaginatedDto<Doctor>> {
    return this.doctorsService.findAll(doctorReqDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin bác sĩ theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin bác sĩ thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bác sĩ' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin bác sĩ' })
  @ApiResponse({ status: 200, description: 'Cập nhật bác sĩ thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bác sĩ' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa bác sĩ' })
  @ApiResponse({ status: 204, description: 'Xóa bác sĩ thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bác sĩ' })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}

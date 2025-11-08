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
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới lịch hẹn' })
  @ApiResponse({ status: 201, description: 'Tạo lịch hẹn thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả lịch hẹn' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách lịch hẹn thành công' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin lịch hẹn theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin lịch hẹn thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy lịch hẹn' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin lịch hẹn' })
  @ApiResponse({ status: 200, description: 'Cập nhật lịch hẹn thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy lịch hẹn' })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa lịch hẹn' })
  @ApiResponse({ status: 204, description: 'Xóa lịch hẹn thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy lịch hẹn' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}


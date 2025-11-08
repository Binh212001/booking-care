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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceReqDto } from './dto/service.dto';
import { OffsetPaginatedDto } from 'src/common/offset-pagination/paginated.dto';
import { Service } from 'src/database/entities';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới dịch vụ' })
  @ApiResponse({ status: 201, description: 'Tạo dịch vụ thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả dịch vụ' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách dịch vụ thành công' })
  findAll(
    @Query() serviceReqDto: ServiceReqDto,
  ): Promise<OffsetPaginatedDto<Service>> {
    return this.servicesService.findAll(serviceReqDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin dịch vụ theo ID' })
  @ApiResponse({ status: 200, description: 'Lấy thông tin dịch vụ thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy dịch vụ' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin dịch vụ' })
  @ApiResponse({ status: 200, description: 'Cập nhật dịch vụ thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy dịch vụ' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa dịch vụ' })
  @ApiResponse({ status: 204, description: 'Xóa dịch vụ thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy dịch vụ' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}


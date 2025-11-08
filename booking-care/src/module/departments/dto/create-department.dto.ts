import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Tên khoa', example: 'Khoa Mắt' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ description: 'Mô tả khoa', example: 'Khoa chuyên khám và điều trị các bệnh về mắt' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Mã khoa', example: 'KM001' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;

  @ApiPropertyOptional({ description: 'Trạng thái hoạt động', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}


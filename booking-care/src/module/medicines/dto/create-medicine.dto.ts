import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMedicineDto {
  @ApiProperty({ description: 'Tên thuốc', example: 'Tobrex' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ description: 'Mã thuốc', example: 'TH001' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;

  @ApiPropertyOptional({ description: 'Hoạt chất', example: 'Tobramycin' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  activeIngredient?: string;

  @ApiPropertyOptional({ description: 'Liều lượng', example: '0.3%' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  dosage?: string;

  @ApiPropertyOptional({ description: 'Đơn vị', example: 'ml' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @ApiPropertyOptional({
    description: 'Dạng thuốc',
    enum: ['tablet', 'capsule', 'eye_drops', 'ointment', 'injection', 'other'],
    example: 'eye_drops',
  })
  @IsOptional()
  @IsEnum(['tablet', 'capsule', 'eye_drops', 'ointment', 'injection', 'other'])
  form?: string;

  @ApiPropertyOptional({
    description: 'Là thuốc mắt',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isEyeMedication?: boolean;

  @ApiPropertyOptional({ description: 'Nhà sản xuất', example: 'Alcon' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  manufacturer?: string;

  @ApiPropertyOptional({ description: 'Nước sản xuất', example: 'USA' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  country?: string;

  @ApiPropertyOptional({ description: 'Giá thuốc', example: 150000 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({
    description: 'Chỉ định',
    example: 'Điều trị viêm kết mạc',
  })
  @IsOptional()
  @IsString()
  indication?: string;

  @ApiPropertyOptional({
    description: 'Chống chỉ định',
    example: 'Dị ứng với Tobramycin',
  })
  @IsOptional()
  @IsString()
  contraindication?: string;

  @ApiPropertyOptional({
    description: 'Tác dụng phụ',
    example: 'Kích ứng mắt, đỏ mắt',
  })
  @IsOptional()
  @IsString()
  sideEffects?: string;

  @ApiPropertyOptional({
    description: 'Cách dùng',
    example: 'Nhỏ 1-2 giọt vào mắt, 3-4 lần/ngày',
  })
  @IsOptional()
  @IsString()
  usage?: string;

  @ApiPropertyOptional({ description: 'Tồn kho', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number;

  @ApiPropertyOptional({
    description: 'Trạng thái hoạt động',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

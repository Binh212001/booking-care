import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  MaxLength,
  Min,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @ApiProperty({ description: 'Tên dịch vụ', example: 'Khám mắt tổng quát' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ description: 'Mã dịch vụ', example: 'DV001' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  code?: string;

  @ApiPropertyOptional({ description: 'Mô tả dịch vụ', example: 'Khám và đánh giá tổng quát tình trạng mắt' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Giá dịch vụ', example: 200000 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ description: 'Đơn vị tính', example: 'lần' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @ApiPropertyOptional({ description: 'Thời gian (phút)', example: 30, default: 30 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  duration?: number;

  @ApiProperty({
    description: 'Loại dịch vụ',
    enum: ['examination', 'surgery', 'test', 'consultation', 'other'],
    example: 'examination',
  })
  @IsEnum(['examination', 'surgery', 'test', 'consultation', 'other'])
  type: string;

  @ApiPropertyOptional({
    description: 'Loại dịch vụ mắt cụ thể',
    enum: [
      'general_eye_exam',
      'refraction',
      'slit_lamp',
      'fundus_exam',
      'tonometry',
      'visual_field',
      'cataract_surgery',
      'lasik',
      'prk',
      'glaucoma_treatment',
      'retinal_surgery',
      'corneal_transplant',
      'other',
    ],
    example: 'general_eye_exam',
  })
  @IsOptional()
  @IsEnum([
    'general_eye_exam',
    'refraction',
    'slit_lamp',
    'fundus_exam',
    'tonometry',
    'visual_field',
    'cataract_surgery',
    'lasik',
    'prk',
    'glaucoma_treatment',
    'retinal_surgery',
    'corneal_transplant',
    'other',
  ])
  eyeServiceType?: string;

  @ApiPropertyOptional({ description: 'Trạng thái hoạt động', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}


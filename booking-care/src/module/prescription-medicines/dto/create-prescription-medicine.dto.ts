import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePrescriptionMedicineDto {
  @ApiProperty({ description: 'ID đơn thuốc', example: 'uuid-here' })
  @IsUUID()
  prescriptionId: string;

  @ApiProperty({ description: 'ID thuốc', example: 'uuid-here' })
  @IsUUID()
  medicineId: string;

  @ApiProperty({ description: 'Số lượng', example: 2 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({ description: 'Liều dùng', example: '1 viên' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  dosage?: string;

  @ApiPropertyOptional({ description: 'Tần suất', example: '2 lần/ngày' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  frequency?: string;

  @ApiPropertyOptional({ description: 'Thời gian dùng', example: '7 ngày' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  duration?: string;

  @ApiPropertyOptional({ description: 'Ghi chú', example: 'Uống sau bữa ăn' })
  @IsOptional()
  @IsString()
  notes?: string;
}


import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreatePrescriptionDto {
  @ApiProperty({ description: 'ID bệnh nhân', example: 'uuid-here' })
  @IsUUID()
  patientId: string;

  @ApiProperty({ description: 'ID bác sĩ', example: 'uuid-here' })
  @IsUUID()
  doctorId: string;

  @ApiPropertyOptional({ description: 'ID lịch hẹn', example: 'uuid-here' })
  @IsOptional()
  @IsUUID()
  appointmentId?: string;

  @ApiPropertyOptional({ description: 'Số đơn thuốc', example: 'DT001' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  prescriptionNumber?: string;

  @ApiPropertyOptional({ description: 'Chẩn đoán', example: 'Viêm kết mạc' })
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiPropertyOptional({ description: 'Ghi chú', example: 'Uống thuốc đúng giờ, đúng liều' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái',
    enum: ['pending', 'filled', 'cancelled'],
    example: 'pending',
    default: 'pending',
  })
  @IsOptional()
  @IsEnum(['pending', 'filled', 'cancelled'])
  status?: string;

  @ApiPropertyOptional({ description: 'Ngày kê thuốc', example: '2024-01-15T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  filledAt?: string;
}


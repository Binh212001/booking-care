import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateTreatmentDto {
  @ApiProperty({ description: 'ID hồ sơ bệnh án', example: 'uuid-here' })
  @IsUUID()
  medicalRecordId: string;

  @ApiProperty({ description: 'ID bác sĩ điều trị', example: 'uuid-here' })
  @IsUUID()
  doctorId: string;

  @ApiProperty({ description: 'Tên điều trị', example: 'Điều trị viêm kết mạc' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ description: 'Mô tả', example: 'Nhỏ thuốc kháng sinh Tobrex' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Ngày bắt đầu', example: '2024-01-15T10:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ description: 'Ngày kết thúc', example: '2024-01-22T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái',
    enum: ['planned', 'in_progress', 'completed', 'cancelled'],
    example: 'planned',
    default: 'planned',
  })
  @IsOptional()
  @IsEnum(['planned', 'in_progress', 'completed', 'cancelled'])
  status?: string;

  @ApiPropertyOptional({
    description: 'Loại điều trị',
    enum: ['medication', 'eye_drops', 'surgery', 'laser', 'injection', 'physical_therapy', 'follow_up', 'other'],
    example: 'eye_drops',
  })
  @IsOptional()
  @IsEnum(['medication', 'eye_drops', 'surgery', 'laser', 'injection', 'physical_therapy', 'follow_up', 'other'])
  treatmentType?: string;

  @ApiPropertyOptional({ description: 'Kết quả', example: 'Bệnh nhân đã khỏi bệnh' })
  @IsOptional()
  @IsString()
  result?: string;

  @ApiPropertyOptional({ description: 'Ghi chú', example: 'Bệnh nhân cần tái khám sau 1 tuần' })
  @IsOptional()
  @IsString()
  notes?: string;
}


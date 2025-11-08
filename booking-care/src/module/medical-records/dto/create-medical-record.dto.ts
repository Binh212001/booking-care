import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateMedicalRecordDto {
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

  @ApiPropertyOptional({
    description: 'Lý do đến khám',
    example: 'Đau mắt, mờ mắt, đỏ mắt',
  })
  @IsOptional()
  @IsString()
  chiefComplaint?: string;

  @ApiPropertyOptional({
    description: 'Bệnh sử hiện tại',
    example: 'Bệnh nhân bị đau mắt 3 ngày nay',
  })
  @IsOptional()
  @IsString()
  presentIllness?: string;

  @ApiPropertyOptional({
    description: 'Khám lâm sàng',
    example: 'Mắt đỏ, chảy nước mắt',
  })
  @IsOptional()
  @IsString()
  examination?: string;

  @ApiPropertyOptional({
    description: 'Thị lực mắt phải không kính',
    example: '20/40',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  rightEyeVisualAcuity?: string;

  @ApiPropertyOptional({
    description: 'Thị lực mắt trái không kính',
    example: '20/40',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  leftEyeVisualAcuity?: string;

  @ApiPropertyOptional({
    description: 'Thị lực mắt phải có kính',
    example: '20/20',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  rightEyeVisualAcuityCorrected?: string;

  @ApiPropertyOptional({
    description: 'Thị lực mắt trái có kính',
    example: '20/20',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  leftEyeVisualAcuityCorrected?: string;

  @ApiPropertyOptional({
    description: 'Nhãn áp mắt phải (mmHg)',
    example: 15.5,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  rightEyePressure?: number;

  @ApiPropertyOptional({
    description: 'Nhãn áp mắt trái (mmHg)',
    example: 16.0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  leftEyePressure?: number;

  @ApiPropertyOptional({
    description: 'Khúc xạ mắt phải',
    example: '-2.5/-0.5x180',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  rightEyeRefraction?: string;

  @ApiPropertyOptional({
    description: 'Khúc xạ mắt trái',
    example: '-2.0/-0.25x90',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  leftEyeRefraction?: string;

  @ApiPropertyOptional({
    description: 'Khám đáy mắt phải',
    example: 'Đáy mắt bình thường',
  })
  @IsOptional()
  @IsString()
  rightEyeFundus?: string;

  @ApiPropertyOptional({
    description: 'Khám đáy mắt trái',
    example: 'Đáy mắt bình thường',
  })
  @IsOptional()
  @IsString()
  leftEyeFundus?: string;

  @ApiPropertyOptional({
    description: 'Khám mắt chi tiết',
    example: 'Giác mạc trong, mống mắt bình thường',
  })
  @IsOptional()
  @IsString()
  eyeExamination?: string;

  @ApiPropertyOptional({ description: 'Chẩn đoán', example: 'Viêm kết mạc' })
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiPropertyOptional({
    description: 'Kế hoạch điều trị',
    example: 'Nhỏ thuốc kháng sinh, tái khám sau 1 tuần',
  })
  @IsOptional()
  @IsString()
  treatmentPlan?: string;

  @ApiPropertyOptional({
    description: 'Ghi chú',
    example: 'Bệnh nhân cần nghỉ ngơi, tránh dụi mắt',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Số hồ sơ', example: 'HS001' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  recordNumber?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái hồ sơ',
    enum: ['new', 'in_progress', 'completed', 'cancelled'],
    example: 'new',
    default: 'new',
  })
  @IsOptional()
  @IsEnum(['new', 'in_progress', 'completed', 'cancelled'])
  status?: string;
}

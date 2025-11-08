import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
  IsDateString,
  MaxLength,
  IsDate,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'ID bệnh nhân', example: 'uuid-here' })
  @IsUUID()
  patientId: string;

  @ApiProperty({ description: 'ID bác sĩ', example: 'uuid-here' })
  @IsUUID()
  doctorId: string;

  @ApiProperty({ description: 'ID phòng', example: 'uuid-here' })
  @IsUUID()
  roomId: string;

  @ApiProperty({ description: 'ID dịch vụ', example: 'uuid-here' })
  @IsUUID()
  serviceId: string;

  @ApiProperty({ description: 'Ngày giờ hẹn', example: '2024-01-15T10:00:00Z' })
  @IsDate()
  appointmentDate: Date;

  @ApiPropertyOptional({
    description: 'Trạng thái',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    example: 'pending',
    default: 'pending',
  })
  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'completed', 'cancelled'])
  status?: string;

  @ApiPropertyOptional({
    description: 'Lý do khám',
    example: 'Đau mắt, mờ mắt',
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    description: 'Ghi chú',
    example: 'Bệnh nhân cần mang theo kính cũ',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Số thứ tự', example: 'A001' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  appointmentNumber?: string;

  @ApiProperty({ description: 'Thời gian bắt đầu', example: '10:00' })
  @IsDate()
  startTime: Date;

  @ApiProperty({ description: 'Thời gian kết thúc', example: '11:00' })
  @IsDate()
  endTime: Date;
}

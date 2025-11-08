import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDateString,
  MaxLength,
  Matches,
  IsUUID,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ description: 'Họ và tên', example: 'Nguyễn Văn B' })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ description: 'Số điện thoại', example: '0901234567' })
  @IsString()
  @MaxLength(20)
  @Matches(/^[0-9]+$/, { message: 'Phone must contain only numbers' })
  phone: string;

  @ApiPropertyOptional({ description: 'Email', example: 'patient@example.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiProperty({
    description: 'Giới tính',
    enum: ['male', 'female', 'other'],
    example: 'male',
  })
  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @ApiProperty({ description: 'Ngày sinh', example: '1990-01-01' })
  @IsDateString()
  dateOfBirth: string;

  @ApiPropertyOptional({ description: 'CMND/CCCD', example: '123456789012' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  identityCard?: string;

  @ApiPropertyOptional({
    description: 'Địa chỉ',
    example: '123 Đường ABC, Quận 1, TP.HCM',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Nhóm máu', example: 'O+' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  bloodType?: string;

  @ApiPropertyOptional({
    description: 'Tiền sử bệnh lý',
    example: 'Tiểu đường, cao huyết áp',
  })
  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @ApiPropertyOptional({
    description: 'Dị ứng',
    example: 'Dị ứng với penicillin',
  })
  @IsOptional()
  @IsString()
  allergy?: string;

  @ApiPropertyOptional({
    description: 'Tiền sử bệnh mắt',
    example: 'Cận thị, viễn thị',
  })
  @IsOptional()
  @IsString()
  eyeHistory?: string;

  @ApiPropertyOptional({
    description: 'Có đeo kính không',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  wearsGlasses?: boolean;

  @ApiPropertyOptional({
    description: 'Có đeo kính áp tròng không',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  wearsContactLens?: boolean;

  @ApiPropertyOptional({ description: 'Độ kính mắt phải', example: '-2.5D' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  rightEyePower?: string;

  @ApiPropertyOptional({ description: 'Độ kính mắt trái', example: '-2.0D' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  leftEyePower?: string;

  @ApiPropertyOptional({
    description: 'Người liên hệ khẩn cấp',
    example: 'Nguyễn Văn C',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  emergencyContact?: string;

  @ApiPropertyOptional({
    description: 'Số điện thoại người liên hệ khẩn cấp',
    example: '0909876543',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  emergencyPhone?: string;

  @ApiProperty({ description: 'ID user', example: 'uuid-here' })
  @IsOptional()
  @IsUUID()
  userId: string;
}

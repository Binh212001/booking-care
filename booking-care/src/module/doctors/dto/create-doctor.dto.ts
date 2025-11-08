import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDateString,
  IsUUID,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ description: 'Họ và tên', example: 'Nguyễn Văn A' })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ description: 'Số điện thoại', example: '0901234567' })
  @IsString()
  @MaxLength(20)
  @Matches(/^[0-9]+$/, { message: 'Phone must contain only numbers' })
  phone: string;

  @ApiProperty({ description: 'Email', example: 'doctor@example.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiPropertyOptional({
    description: 'Số chứng chỉ hành nghề',
    example: 'CC12345',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  licenseNumber?: string;

  @ApiPropertyOptional({ description: 'Chuyên khoa', example: 'Mắt' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  specialization?: string;

  @ApiPropertyOptional({ description: 'Học vị', example: 'Tiến sĩ' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  degree?: string;

  @ApiPropertyOptional({
    description: 'Kinh nghiệm',
    example: '10 năm kinh nghiệm trong lĩnh vực mắt',
  })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiPropertyOptional({
    description: 'Giới tính',
    enum: ['male', 'female', 'other'],
    example: 'male',
  })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ description: 'Ngày sinh', example: '1980-01-01' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'Địa chỉ',
    example: '123 Đường ABC, Quận 1, TP.HCM',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Ảnh đại diện',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái hoạt động',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'ID khoa', example: 'uuid-here' })
  @IsUUID()
  @IsOptional()
  departmentId?: string;
}

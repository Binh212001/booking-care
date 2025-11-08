import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Tên đăng nhập', example: 'john_doe' })
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiProperty({ description: 'Email', example: 'user@example.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ description: 'Mật khẩu', example: 'password123' })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiPropertyOptional({
    description: 'Vai trò',
    enum: ['admin', 'doctor', 'patient'],
    default: 'patient',
    example: 'patient',
  })
  @IsOptional()
  @IsEnum(['admin', 'doctor', 'patient'])
  role?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái hoạt động',
    default: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}


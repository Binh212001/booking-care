import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class PresignedUrlDto {
  @ApiProperty({ description: 'Tên file', example: 'avatar.jpg' })
  @IsString()
  @MaxLength(255)
  fileName: string;
}

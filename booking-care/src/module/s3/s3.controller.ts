import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { S3Service } from './s3.service';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { PresignedUrlDto } from 'src/common/presigned-url.dto';

@ApiTags('S3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('generate-presigned-url')
  @ApiOperation({ summary: 'Tạo URL đăng ký sử dụng S3' })
  @ApiResponse({
    status: 200,
    description: 'Tạo URL đăng ký sử dụng S3 thành công',
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  generatePresignedUrl(@Body() presignedUrlDto: PresignedUrlDto) {
    return this.s3Service.generatePresignedUrl(presignedUrlDto);
  }
}

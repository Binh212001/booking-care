import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PresignedUrlDto } from 'src/common/presigned-url.dto';

@Injectable()
export class S3Service {
  constructor(private readonly s3: S3Client) {}

  async generatePresignedUrl(presignedUrlDto: PresignedUrlDto) {
    const { fileName } = presignedUrlDto;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 60 * 5 });
    return url;
  }
}

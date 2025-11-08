import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { s3ClientFactory } from './s3.client';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
@Global()
@Module({
  controllers: [S3Controller],
  imports: [ConfigModule],
  providers: [s3ClientFactory, S3Service],
  exports: [S3Service],
})
export class AwsModule {}

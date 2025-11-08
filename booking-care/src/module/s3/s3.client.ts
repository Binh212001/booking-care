import { S3Client } from '@aws-sdk/client-s3';

export const s3ClientFactory = {
  provide: S3Client,
  useFactory: () => {
    return new S3Client({
      region: (process.env.AWS_REGION as string) || 'ap-southeast-1',
      credentials: {
        accessKeyId: (process.env.AWS_ACCESS_KEY_ID as string) || '',
        secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY as string) || '',
      },
    });
  },
};

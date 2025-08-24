import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { createRequest } from '@aws-sdk/util-create-request';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { formatUrl } from '@aws-sdk/util-format-url';
import { GetPresignedUrlInput } from './dto/presignedUrl.dto';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucket: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION') ?? '',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
      },
    });
    this.bucket = this.configService.get<string>('AWS_BUCKET') ?? '';
  }

  async getPresignedUrl(input: GetPresignedUrlInput): Promise<string> {
    const { key, contentType, expiresIn } = input;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });
    const presigner = new S3RequestPresigner(this.s3.config);
    const request = await createRequest(this.s3, command);
    const signed = await presigner.presign(request, { expiresIn: expiresIn ?? 300 });
    return formatUrl(signed);
  }
}

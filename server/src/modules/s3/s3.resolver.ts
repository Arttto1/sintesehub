import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { S3Service } from './s3.service';
import { GetPresignedUrlInput } from './dto/presignedUrl.dto';

@Resolver()
export class S3Resolver {
  constructor(private readonly s3Service: S3Service) {}

  @Query(() => String)
  @UseGuards(AuthGuard)
  async getPresignedUrl(@Args('input') input: GetPresignedUrlInput): Promise<string> {
    return this.s3Service.getPresignedUrl(input);
  }
}

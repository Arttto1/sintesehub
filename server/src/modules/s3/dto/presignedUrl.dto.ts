import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetPresignedUrlInput {
  @Field()
  key: string;

  @Field()
  contentType: string;

  @Field({ nullable: true })
  expiresIn?: number;
}

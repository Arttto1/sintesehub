import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  googleToken?: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/dto/user.dto';

@ObjectType()
export class AuthUser {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}

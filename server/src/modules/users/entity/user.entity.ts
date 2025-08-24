import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { name: 'accountId' })
  account_id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field({ name: 'createdAt' })
  created_at: Date;

  @Field({ name: 'updatedAt' })
  updated_at: Date;
}

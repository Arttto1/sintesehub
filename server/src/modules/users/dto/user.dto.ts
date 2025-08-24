import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { name: 'accountId' })
  account_id: string;

  @Field()
  username: string;

  @Field({ name: 'createdAt' })
  created_at: Date;

  @Field({ name: 'updatedAt' })
  updated_at: Date;

  @Field({ name: 'lastLogin' })
  last_login: Date;

  @Field({ name: 'emailVerifiedAt' })
  email_verified_at: Date;

  // @Field()
  // role: Roles
}

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  niche: string;

  @Field({ name: 'evoDomain' })
  evo_domain: string;

  @Field({ name: 'evoKey' })
  evo_key: string;

  @Field({ name: 'agentWebhook' })
  agent_webhook: string;

  @Field({ name: 'whatsappConnected' })
  whatsapp_connected: boolean;

  @Field({ name: 'createdAt' })
  created_at: Date;

  @Field({ name: 'updatedAt' })
  updated_at: Date;
}

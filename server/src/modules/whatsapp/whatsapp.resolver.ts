import { Args, Query, Resolver } from '@nestjs/graphql';
import { WhatsappService } from './whatsapp.service';

@Resolver()
export class WhatsappResolver {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Query(() => Boolean)
  async isWhatsappConfigured(@Args('username') username: string) {
    return this.whatsappService.isWhatsappConfigured(username);
  }

  @Query(() => Boolean)
  async connectionStatus(@Args('username') username: string) {
    return this.whatsappService.connectionStatus(username);
  }

  @Query(() => String)
  async qrcode(@Args('username') username: string) {
    return this.whatsappService.qrcode(username);
  }
}

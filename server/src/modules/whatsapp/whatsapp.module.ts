import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/infra/database/database.module';
import { WhatsappResolver } from './whatsapp.resolver';
import { WhatsappService } from './whatsapp.service';
import { MeService } from '../me/me.service';

@Module({
  providers: [WhatsappResolver, WhatsappService, MeService],
  imports: [DatabaseModule, HttpModule],
})
export class WhatsappModule {}

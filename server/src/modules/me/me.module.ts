import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { MeResolver } from './me.resolver';
import { MeService } from './me.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  providers: [MeResolver, MeService],
  imports: [DatabaseModule],
})
export class MeModule {}

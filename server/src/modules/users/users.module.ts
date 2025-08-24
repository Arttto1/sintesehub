import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}

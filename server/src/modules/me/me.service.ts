import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { User } from '../users/dto/user.dto';
import { SinteseContext } from 'src/common/context/sintese-context.type';

@Injectable()
export class MeService {
  constructor(private readonly dbService: DatabaseService) {}

  async me(ctx: SinteseContext): Promise<User> {
    const userId = ctx.req.user?.['id'];
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.dbService.db('users').select('*').where({ id: userId }).first();
  }

  async meByUsername(username: string): Promise<User> {
    return this.dbService.db('users').select('*').where({ username }).first();
  }
}

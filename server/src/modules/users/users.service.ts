import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { DatabaseService } from 'src/infra/database/database.service';
import { User } from './dto/user.dto';
import { SinteseContext } from 'src/common/context/sintese-context.type';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}
  public async authUser(input: Record<string, string>): Promise<UserEntity> {
    return this.dbService.db('users').select('*').where(input).first();
  }

  public async users(ctx: SinteseContext): Promise<User[]> {
    return this.dbService.db('users').select('*');
    // .where({ accountId: ctx.req.user });
  }
}

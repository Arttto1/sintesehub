import { Context, Query, Resolver } from '@nestjs/graphql';
import { User } from './dto/user.dto';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import type { SinteseContext } from 'src/common/context/sintese-context.type';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(AuthGuard)
  async users(@Context() ctx: SinteseContext): Promise<User[]> {
    return this.usersService.users(ctx);
  }
}

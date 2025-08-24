import { Context, Query, Resolver } from '@nestjs/graphql';
import { MeService } from './me.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { User } from '../users/dto/user.dto';
import type { SinteseContext } from 'src/common/context/sintese-context.type';

@Resolver()
export class MeResolver {
  constructor(private readonly meService: MeService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  async me(@Context() ctx: SinteseContext): Promise<User> {
    return this.meService.me(ctx);
  }
}

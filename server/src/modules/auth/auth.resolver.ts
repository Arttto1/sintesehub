import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { User } from '../users/dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import type { SinteseContext } from 'src/common/context/sintese-context.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signIn(@Args('input') input: SignInInput, @Context() ctx: SinteseContext): Promise<User> {
    return this.authService.signIn(input, ctx.res);
  }

  @Mutation(() => Boolean)
  async signOut(@Context() ctx: SinteseContext): Promise<boolean> {
    return this.authService.signOut(ctx.res);
  }

  @Query(() => Boolean)
  @UseGuards(AuthGuard)
  async isAuthenticated(): Promise<boolean> {
    return true;
  }
}

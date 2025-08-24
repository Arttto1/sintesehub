import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

// Custom JWT AuthGuard para GraphQL
class JwtAuthGuard extends PassportAuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtGuard = new JwtAuthGuard();
  private googleGuard = new (PassportAuthGuard('google'))();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtResult = await this.jwtGuard.canActivate(context);
    if (jwtResult) return true;

    // Tenta autenticar com Google OAuth2
    // const googleResult = await this.googleGuard.canActivate(context);
    // if (googleResult) return true;

    throw new UnauthorizedException('Authentication failed');
  }
}

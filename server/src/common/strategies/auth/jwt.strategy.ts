import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as cookie from 'cookie';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        return cookies['auth_token'] ?? null;
      },
      secretOrKey: configService.get<string>('JWT_SECRET') || 'ravizito',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, account_id: payload.accountId, name: payload.name };
  }
}

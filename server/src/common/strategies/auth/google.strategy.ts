import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || 'default_client_id',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || 'default_client_secret',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || 'default_callback_url',
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      googleId: profile.id,
      email: profile.emails[0].value,
      profile,
    };
  }
}

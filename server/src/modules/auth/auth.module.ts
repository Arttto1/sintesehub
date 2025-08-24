import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleAuthService } from './services/google.auth.service';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { JwtStrategy } from 'src/common/strategies/auth/jwt.strategy';
import { GoogleStrategy } from 'src/common/strategies/auth/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/infra/database/database.module';
import { IdentifierAndPasswordAuthService } from './services/identifier-and-password.auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    IdentifierAndPasswordAuthService,
    GoogleAuthService,
    UsersService,
    AuthGuard,
    JwtStrategy,
    GoogleStrategy,
  ],
  exports: [JwtModule],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { throwGraphqlError } from 'src/common/errors/errors.graphql';
import { Response } from 'express';
import { IdentifierAndPasswordAuthService } from './services/identifier-and-password.auth.service';
import { User } from '../users/dto/user.dto';
import { GoogleAuthService } from './services/google.auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly identifierAndPasswordAuthService: IdentifierAndPasswordAuthService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  async signIn(input: SignInInput, res: Response): Promise<User> {
    if (input.username && input.password) {
      return this.identifierAndPasswordAuthService.auth(input.username, input.password, res);
    }

    if (input.googleToken) {
      return this.googleAuthService.auth(input.googleToken);
    }

    throwGraphqlError('Method not implemented', 'sign-in/method-not-implemented');
  }

  async signOut(res: Response): Promise<boolean> {
    res.clearCookie('auth_token');
    return true;
  }
}

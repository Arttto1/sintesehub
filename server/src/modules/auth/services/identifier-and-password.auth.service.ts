import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { throwGraphqlError } from 'src/common/errors/errors.graphql';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IdentifierAndPasswordAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async auth(username: string, password: string, res: Response): Promise<User> {
    const user = await this.usersService.authUser({
      username,
    });

    if (!user) {
      throwGraphqlError('Invalid credentials', 'auth/invalid-credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throwGraphqlError('Invalid credentials', 'auth/invalid-credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      accountId: user.account_id,
      username: user.username,
      email: user.email,
      name: user.name,
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      maxAge: 86400000,
    });

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { throwGraphqlError } from 'src/common/errors/errors.graphql';
import { User } from 'src/modules/users/dto/user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class GoogleAuthService {
  public constructor(private readonly usersService: UsersService) {}

  public async auth(googleToken: string): Promise<User> {
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throwGraphqlError('Invalid credentials', 'auth/invalid-credentials');
    }

    const email = payload.email;

    if (!email) {
      throwGraphqlError('Invalid credentials', 'auth/invalid-credentials');
    }

    const user = await this.usersService.authUser({
      email,
    });

    if (!user) {
      throwGraphqlError('User not found', 'auth/user-not-found');
    }

    return user;
  }
}

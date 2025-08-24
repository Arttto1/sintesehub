import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  IsAuthenticatedGQL,
  SignInGQL,
  SignInInput,
  SignOutGQL,
} from '../../../../generated/graphql';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly signInGQL: SignInGQL,
    private readonly signOutGQL: SignOutGQL,
    private readonly router: Router,
    private readonly isAuthenticatedGQL: IsAuthenticatedGQL,
  ) {}

  public async signIn(input: SignInInput) {
    return firstValueFrom(this.signInGQL.mutate({ input }));
  }

  public async signOut(): Promise<void> {
    // TRATAR ERROS
    try {
      await firstValueFrom(this.signOutGQL.mutate());
      // localStorage.removeItem(this.AUTH_CACHE_KEY);
      this.router.navigate(['/sign-in']);
      console.log('User signed out successfully');
    } catch (error) {
      console.log(error);
      // localStorage.removeItem(this.AUTH_CACHE_KEY);
      this.router.navigate(['/sign-in']);
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    // const cachedTimestamp = localStorage.getItem(this.AUTH_CACHE_KEY);

    // if (cachedTimestamp) {
    //   const timestamp = parseInt(cachedTimestamp, 10);
    //   const now = Date.now();

    //   if (now - timestamp < this.CACHE_DURATION) {
    //     return true;
    //   }
    // }

    try {
      const result = await firstValueFrom(this.isAuthenticatedGQL.fetch());

      if (result.data?.isAuthenticated) {
        // localStorage.setItem(this.AUTH_CACHE_KEY, Date.now().toString());
        return true;
      }

      // localStorage.removeItem(this.AUTH_CACHE_KEY);
      return false;
    } catch {
      // localStorage.removeItem(this.AUTH_CACHE_KEY);
      return false;
    }
  }
}

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideApollo } from 'apollo-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InMemoryCache } from '@apollo/client/cache';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideApollo(() => ({
      uri: `${environment.apiUrl}/graphql`,
      cache: new InMemoryCache({}),
      credentials: 'include',
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-first',
        },
        query: {
          fetchPolicy: 'cache-first',
        },
      },
    })),
    provideHttpClient(withFetch()),
  ],
};

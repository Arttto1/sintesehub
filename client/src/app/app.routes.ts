import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { PageLayoutService } from './core/layout/layout.service';
import { PageLayout } from './core/layout/layout.interface';

export const setLayout = (inputLayout: PageLayout): ResolveFn<void> => {
  return () => {
    inject(PageLayoutService).setLayout(inputLayout);
  };
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    resolve: {
      layout: setLayout('blank'),
    },
    // canActivate: [NotAuthGuard],
    loadChildren: () => import('./pages/sign-in/sign-in.routes').then((m) => m.SignInRoutes),
  },
  {
    path: 'dashboard',
    resolve: {
      layout: setLayout('main'),
    },
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.DashboardRoutes),
  },
  {
    path: 'settings',
    resolve: {
      layout: setLayout('main'),
    },
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/settings/settings.routes').then((m) => m.SettingsRoutes),
  },
  {
    path: 'whatsapp-connection',
    resolve: {
      layout: setLayout('main'),
    },
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/whatsapp/whatsapp.routes').then((m) => m.WhatsappRoutes),
  },
];

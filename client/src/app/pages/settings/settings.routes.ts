import { Routes } from '@angular/router';
// import { AuthGuard } from '../../core/services/auth/guards/auth.guard';

export const SettingsRoutes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./settings.component').then((m) => m.SettingsComponent),
  },
];

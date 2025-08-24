import { Routes } from '@angular/router';
// import { AuthGuard } from '../../core/services/auth/guards/auth.guard';

export const DashboardRoutes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard.component').then((m) => m.DashboardComponent),
  },
];

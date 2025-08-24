import { Routes } from '@angular/router';
// import { AuthGuard } from '../../core/services/auth/guards/auth.guard';

export const SignInRoutes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./sign-in.component').then((m) => m.SignInComponent),
  },
];

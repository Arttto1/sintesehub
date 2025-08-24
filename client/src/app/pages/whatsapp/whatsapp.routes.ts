import { Routes } from '@angular/router';
// import { AuthGuard } from '../../core/services/auth/guards/auth.guard';

export const WhatsappRoutes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadComponent: () => import('./whatsapp.component').then((m) => m.WhatsappComponent),
  },
];

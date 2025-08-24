import { Component, inject, signal } from '@angular/core';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WarmogToastService } from '../../../services/warmog-toast/warmog-toast.service';

export interface NavItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [CommonModule],
})
export class NavigationComponent {
  public authService = inject(AuthService);
  public navigationService = inject(NavigationService);
  public toastService = inject(WarmogToastService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public activeRoute = signal<string>('');

  public readonly navItems = [
    {
      path: '/dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
    },
    {
      path: '/settings',
      icon: 'settings',
      label: 'Configurações da Conta',
    },
    {
      path: '/whatsapp-connection',
      icon: 'whatsapp-settings',
      label: 'WhatsApp',
    },
  ];

  ngOnInit() {
    this.activeRoute.set(window.location.pathname);
  }

  async onNavItemClick(path: string): Promise<void> {
    if (this.activeRoute() === path) return;
    try {
      const ok = await this.navigationService.navigateTo(path);
      if (!ok) {
        this.toastService.showError('Ocorrreu um erro ao navegar.');
        return;
      }
      this.activeRoute.set(path);
    } catch {
      this.toastService.showError('Ocorrreu um erro ao navegar.');
    }
  }

  public async logout() {
    await this.authService.signOut();
  }
}

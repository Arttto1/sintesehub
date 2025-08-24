import { inject, Injectable, signal } from '@angular/core';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);

  // Signal para expor a direção de navegação
  public navigationDirection = signal<'forward' | 'backward'>('forward');

  // Ordem das rotas baseada na navegação
  private routeOrder = ['/dashboard', '/settings', '/whatsapp-connection'];

  private previousRoute: string | null = null;
  private currentRoute: string | null = null;

  constructor() {
    // Inicializar com a rota atual
    this.currentRoute = this.router.url;

    // Escutar mudanças de rota
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.handleRouteChange(event.url);
      }
    });
  }

  navigateTo(path: string): Promise<boolean> {
    return this.router.navigate([path]);
  }

  private handleRouteChange(newRoute: string) {
    this.previousRoute = this.currentRoute;
    this.currentRoute = newRoute;

    if (this.previousRoute && this.currentRoute) {
      const direction = this.getNavigationDirection(this.previousRoute, this.currentRoute);
      this.navigationDirection.set(direction);
    }
  }

  private getNavigationDirection(fromRoute: string, toRoute: string): 'forward' | 'backward' {
    const fromIndex = this.routeOrder.indexOf(fromRoute);
    const toIndex = this.routeOrder.indexOf(toRoute);

    if (fromIndex === -1 || toIndex === -1) {
      return 'forward';
    }

    return toIndex > fromIndex ? 'forward' : 'backward';
  }
}

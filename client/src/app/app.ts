import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PageLayout } from './core/layout/layout.interface';
import { PageLayoutService } from './core/layout/layout.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MainLayoutComponent } from './core/layout/main/main.component';
import { BlankLayoutComponent } from './core/layout/blank/blank.component';
import { WarmogToastComponent } from './core/services/warmog-toast/warmog-toast.component';
import { WarmogModalComponent } from './core/services/warmog-modal/warmog-modal.component';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, BlankLayoutComponent, WarmogToastComponent, WarmogModalComponent],
  templateUrl: './app.html',
})
export class App {
  public pageLayoutService = inject(PageLayoutService);
  public destroyRef = inject(DestroyRef);

  protected readonly title = signal('client');
  public pageLayout = signal<PageLayout | null>('blank');

  ngOnInit(): void {
    this.pageLayoutService.layout$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((layout) => {
      this.pageLayout.set(layout);
    });
  }
}

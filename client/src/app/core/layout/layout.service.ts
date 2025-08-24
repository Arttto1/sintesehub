import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import type { PageLayout } from './layout.interface';

@Injectable({
  providedIn: 'root'
})
export class PageLayoutService implements OnDestroy {
  public layout$ = new Subject<PageLayout>();

  setLayout(value: PageLayout) {
    this.layout$.next(value);
  }

  ngOnDestroy(): void {
    this.layout$.complete();
  }
}

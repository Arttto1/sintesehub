import { Injectable, signal } from '@angular/core';
import { WarmogModalOptions } from './warmog-modal.interface';

@Injectable({ providedIn: 'root' })
export class WarmogModalService {
  public modalOptions = signal<WarmogModalOptions | null>(null);
  public isOpen = signal(false);
  private resolver: ((result: 'confirm' | 'cancel') => void) | null = null;

  open(options: WarmogModalOptions): Promise<'confirm' | 'cancel'> {
    this.modalOptions.set(options);
    this.isOpen.set(true);
    return new Promise<'confirm' | 'cancel'>((resolve) => {
      this.resolver = resolve;
    });
  }

  close(result: 'confirm' | 'cancel') {
    this.isOpen.set(false);
    this.modalOptions.set(null);
    if (this.resolver) {
      this.resolver(result);
      this.resolver = null;
    }
  }
}

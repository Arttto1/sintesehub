import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WarmogToast } from './warmog-toast.interface';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class WarmogToastService {
  public toast = new Subject<WarmogToast>();

  public showSuccess(message: string, duration?: number): void {
    this.toast.next({
      id: uuid(),
      message,
      type: 'success',
      duration: duration ?? 3000,
    });
  }
  // public showInfo(message: string, duration?: number): void {
  //   this.toast.next({
  //     id: uuid(),
  //     message,
  //     type: 'info',
  //     duration: duration ?? 3000,
  //   });
  // }
  public showWarning(message: string, duration?: number): void {
    this.toast.next({
      id: uuid(),
      message,
      type: 'warning',
      duration: duration ?? 3000,
    });
  }
  public showError(message: string, duration?: number): void {
    this.toast.next({
      id: uuid(),
      message,
      type: 'negative',
      duration: duration ?? 3000,
    });
  }
}

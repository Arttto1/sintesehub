import { Component, DestroyRef, OnInit } from '@angular/core';
import { WarmogToastService } from './warmog-toast.service';
import { WarmogToast } from './warmog-toast.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'warmog-toast',
  templateUrl: './warmog-toast.component.html',
  styleUrls: ['./warmog-toast.component.css'],
  imports: [CommonModule],
})
export class WarmogToastComponent implements OnInit {
  public toasts: WarmogToast[] = [];

  constructor(
    private toastService: WarmogToastService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.toastService.toast.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((toast) => {
      this.toasts.push(toast);
      setTimeout(() => {
        const idx = this.toasts.findIndex((t) => t.id === toast.id);
        if (idx > -1) {
          this.toasts[idx].hide = true;
          setTimeout(() => {
            this.toasts = this.toasts.filter((t) => t.id !== toast.id);
          }, 500);
        }
      }, toast.duration ?? 3000);
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'warmog-input-error',
  templateUrl: './warmog-input-error.component.html',
  imports: [CommonModule],
})
export class WarmogInputErrorComponent {
  public type = input<'negative' | 'warning'>('negative');
}

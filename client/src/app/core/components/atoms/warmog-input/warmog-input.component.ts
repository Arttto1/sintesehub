import { Component, input, signal } from '@angular/core';
import { WarmogTextComponent } from '../warmog-text/warmog-text.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'warmog-input',
  templateUrl: './warmog-input.component.html',
  imports: [WarmogTextComponent, ReactiveFormsModule, CommonModule],
})
export class WarmogInputComponent {
  public label = input<string>('');
  public labelColor = input<string>('primary');
  public placeholder = input<string>('');
  public control = input.required<FormControl>();
  public disabled = input<boolean>(false);
  public error = signal<string | null>(null);
  public isFocused = signal<boolean>(false);
  public maxLength = input<number | null>(null);

  public isPasswordInput = input<boolean>(false);
  public isPasswordVisible = signal<boolean>(false);

  public hideAsterisk = input<boolean>(false);

  get isRequired(): boolean {
    return this.control().hasValidator(Validators.required);
  }

  public togglePasswordVisibility() {
    if (!this.isPasswordInput()) return;
    this.isPasswordVisible.update((value) => !value);
  }
}

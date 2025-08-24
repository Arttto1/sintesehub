import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'warmog-text',
  templateUrl: './warmog-text.component.html',
  styleUrls: ['./warmog-text.component.css'],
  imports: [CommonModule],
})
export class WarmogTextComponent {
  public color = input<string>('primary');
  public underlined = input<boolean>(false);
  public hoverable = input<boolean>(false);
}

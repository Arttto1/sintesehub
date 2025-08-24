import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarmogModalService } from './warmog-modal.service';

@Component({
  selector: 'warmog-modal',
  standalone: true,
  templateUrl: './warmog-modal.component.html',
  styleUrls: ['./warmog-modal.component.css'],
  imports: [CommonModule],
})
export class WarmogModalComponent {
  private readonly modalService = inject(WarmogModalService);
  public isOpen = this.modalService.isOpen;
  public options = this.modalService.modalOptions;

  confirm() {
    this.modalService.close('confirm');
  }

  cancel() {
    this.modalService.close('cancel');
  }
}

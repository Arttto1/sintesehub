import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { leads } from './mock';

@Component({
  standalone: true,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule],
})
export class DashboardComponent {
  rowColorId = 0;

  // Tooltip properties
  public tooltipVisible = signal(false);
  public tooltipText = '';
  public tooltipPosition = { x: 0, y: 0 };
  private tooltipTimeout: any;

  columnKeys = [
    { name: 'client', width: '150px' },
    { name: 'name', width: '200px' },
    { name: 'phone', width: '150px' },
    { name: 'status', width: '100px' },
    { name: 'step', width: '100px' },
    { name: 'messageDate', width: '150px' },
    { name: 'follow', width: '100px' },
    { name: 'summary', width: '200px' },
    { name: 'origin', width: '150px' },
  ];
  columnMap: Record<string, string> = {
    client: 'Cliente',
    name: 'Nome',
    phone: 'Telefone',
    status: 'Status',
    step: 'Etapa',
    messageDate: 'Data da Mensagem',
    follow: 'Acompanhar',
    summary: 'Resumo',
    origin: 'Origem',
  };

  data = leads;

  getValue(row: any, col: string) {
    return row[col];
  }

  isValueLong(value: string | number, maxLength: number = 15): boolean {
    return value.toString().length > maxLength;
  }

  // Tooltip methods
  onMouseEnter(event: MouseEvent, text: string | number, isLong: boolean) {
    if (!isLong) return;
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    // Set timeout for 500ms (meio segundo)
    this.tooltipTimeout = setTimeout(() => {
      this.tooltipText = text.toString();
      this.tooltipPosition = {
        x: event.clientX + 10,
        y: event.clientY - 30,
      };
      this.tooltipVisible.set(true);
    }, 500);
  }

  onMouseLeave() {
    // Clear timeout and hide tooltip
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
    this.tooltipVisible.set(false);
  }

  onMouseMove(event: MouseEvent) {
    // Update tooltip position if visible
    if (this.tooltipVisible()) {
      this.tooltipPosition = {
        x: event.clientX + 10,
        y: event.clientY - 30,
      };
    }
  }
}

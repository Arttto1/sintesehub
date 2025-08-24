import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

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

  mockdata = [
    {
      client: 'Client A',
      name: 'John Doe',
      phone: '123-456-7890',
      status: 'Active',
      step: 1,
      messageDate: new Date(),
      follow: true,
      summary: 'Summary A',
      origin: 'Web',
    },
    {
      client: 'Client B - Nome muito longo que vai ser truncado',
      name: 'Jane Smith com um nome muito longo',
      phone: '987-654-3210',
      status: 'Inactive',
      step: 2,
      messageDate: new Date(),
      follow: false,
      summary: 'Summary B com um resumo muito longo que deveria ser truncado no final',
      origin: 'Mobile',
    },
    {
      client: 'Client C',
      name: 'Alice Johnson',
      phone: '555-555-5555',
      status: 'Active',
      step: 3,
      messageDate: new Date(),
      follow: true,
      summary: 'Summary C',
      origin: 'Email',
    },
    {
      client: 'Client D',
      name: 'Bob Brown',
      phone: '444-444-4444',
      status: 'Inactive',
      step: 4,
      messageDate: new Date(),
      follow: false,
      summary: 'Summary D',
      origin: 'Web',
    },
    {
      client: 'Client E',
      name: 'Charlie Davis com nome extenso',
      phone: '333-333-3333',
      status: 'Active',
      step: 5,
      messageDate: new Date(),
      follow: true,
      summary: 'Summary E',
      origin: 'Web',
    },
    {
      client: 'Client F',
      name: 'David Wilson',
      phone: '222-222-2222',
      status: 'Inactive',
      step: 6,
      messageDate: new Date(),
      follow: false,
      summary: 'Summary F',
      origin: 'Mobile',
    },
    {
      client: 'Client G',
      name: 'Emily Clark',
      phone: '111-111-1111',
      status: 'Active',
      step: 7,
      messageDate: new Date(),
      follow: true,
      summary: 'Summary G',
      origin: 'Web',
    },
    {
      client: 'Client H',
      name: 'Frank Harris',
      phone: '000-000-0000',
      status: 'Inactive',
      step: 8,
      messageDate: new Date(),
      follow: false,
      summary: 'Summary H',
      origin: 'Email',
    },
    {
      client: 'Client I',
      name: 'Grace Lee',
      phone: '999-999-9999',
      status: 'Active',
      step: 9,
      messageDate: new Date(),
      follow: true,
      summary: 'Summary I',
      origin: 'Web',
    },
  ];

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

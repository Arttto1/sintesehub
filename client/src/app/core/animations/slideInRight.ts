import { animate, style, transition, trigger } from '@angular/animations';

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [style({ transform: 'translateX(100%)' }), animate('500ms ease-out', style({ transform: 'translateX(0)' }))]),
]);

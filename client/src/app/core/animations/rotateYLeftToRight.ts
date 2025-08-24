import { trigger, state, style, animate, transition } from '@angular/animations';

export const rotateYLeftToRight = trigger('rotateY', [
  state('initial', style({ transform: 'rotateY(0deg)' })),
  state('rotated', style({ transform: 'rotateY(180deg)' })),
  transition('initial <=> rotated', animate('300ms cubic-bezier(.68,-0.55,.27,1.55)')),
]);

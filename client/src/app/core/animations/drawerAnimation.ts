import { animate, state, style, transition, trigger } from '@angular/animations';

export const drawerAnimation = trigger('drawerAnimation', [
  state('enter', style({ transform: 'translateX(0)', opacity: 1 })),
  state('leave', style({ transform: 'translateX(100%)', opacity: 0.8 })),
  transition('enter => leave', [animate('300ms ease-out')]),
  transition('void => enter', [style({ transform: 'translateX(100%)', opacity: 0 }), animate('300ms ease-out')]),
]);

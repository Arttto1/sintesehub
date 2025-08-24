import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandCollapseRightLeft = trigger('expandCollapseRightLeft', [
  state('collapsed', style({ width: '0px', opacity: 0, visibility: 'hidden' })),
  state('expanded', style({ width: '224px', opacity: 1, visibility: 'visible' })),

  transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
]);

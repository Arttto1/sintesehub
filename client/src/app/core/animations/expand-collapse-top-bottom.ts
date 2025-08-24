import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandCollapseTopBottom = trigger('expandCollapseTopBottom', [
  state('collapsed', style({ height: '0px', opacity: 0, visibility: 'hidden' })),
  state('expanded', style({ height: '*', opacity: 1, visibility: 'visible' })),

  transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
]);

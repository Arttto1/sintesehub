import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

export const menuState = trigger('menuState', [
  state('collapsed', style({ width: '64px' })),
  state('expanded', style({ width: '256px' })),

  transition('collapsed <=> expanded', [
    group([animate('300ms ease-in-out'), query('@slideInRightOutLeft', animateChild(), { optional: true })]),
  ]),
]);

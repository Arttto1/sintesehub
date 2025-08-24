import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInRightOutLeft = trigger('slideInRightOutLeft', [
  state(
    'slideIn',
    style({
      opacity: 1,
      left: '0',
    }),
  ),
  state(
    'slideOut',
    style({
      opacity: 1,
      left: '-220px',
    }),
  ),
  transition('slideIn <=> slideOut', [animate('300ms ease-in-out')]),
]);

import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';

export const dropdownAnimation = trigger('dropdownAnim', [
  transition(':enter', [
    style({ height: 0, opacity: 0, overflow: 'hidden' }),
    animate('300ms ease', style({ height: '*', opacity: 1 })),
    query('@itemAnim', stagger(50, animateChild()), { optional: true }),
  ]),
  transition(':leave', [style({ overflow: 'hidden' }), animate('150ms ease', style({ height: 0, opacity: 0 }))]),
]);

export const itemAnimation = trigger('itemAnim', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-5px)' }),
    animate('100ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [animate('100ms', style({ opacity: 0, transform: 'translateY(-5px)' }))]),
]);

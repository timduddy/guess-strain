import { animate, state, style, transition, trigger } from '@angular/animations';

// Component transition animations
export const crazyAnimation =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0) rotate(360deg) scale(1)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0) rotate(180deg) scale(0)'
      }),
      animate('550ms cubic-bezier(0.25,0.5,0.25,1.1)')
    ]),
    transition(':leave', [
      style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0) rotate(180deg) scale(0)'
      }),
      animate('550ms cubic-bezier(0.25,0.5,0.25,1.1)')
    ])
  ]);

export const slideLeftToRight =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translate3d(-100%, 0, 0)'
      }),
      animate('450ms cubic-bezier(0.25,0.5,0.25,1)')
    ]),
    /*transition(':leave', [
      style({
        opacity: 0,
        transform: 'translate3d(-100%, 0, 0)'
      }),
      animate('450ms cubic-bezier(0.25,0.5,0.25,1.05)')
    ])*/
  ]);

export const slideRightToLeft =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0)'
      }),
      animate('450ms cubic-bezier(0.25,0.5,0.25,1.05)')
    ]),
    /*transition(':leave', [
      style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0)'
      }),
      animate('450ms cubic-bezier(0.25,0.5,0.25,1.05)')
    ])*/
  ]);

export const slideUp =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translate3d(0, 100%, 0)'
      }),
      animate('650ms cubic-bezier(0.25,0.5,0.25,1.05)')
    ]),
    /*transition(':leave', [
      style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0)'
      }),
      animate('450ms cubic-bezier(0.25,0.5,0.25,1.05)')
    ])*/
  ]);
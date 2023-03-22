import {animate, state, style, transition, trigger} from "@angular/animations";

export const flyInRight = trigger('flyInRight', [
    transition('void => *', [
        style({opacity: 0}),
        style({transform: 'translateX(100%)', opacity: 1}),
        animate('0.4s')
    ]),
    transition('* => void', [
        animate('0.4s'),
        style({transform: 'translateX(200%)', opacity: 0})
    ])
]);


export const fadeIn = trigger('fadeIn', [
    transition('void => *', [
        style({opacity: 1}),
        animate('0.2s')
    ]),
    transition('* => void', [
        animate('0.5s'),
        style({opacity: 0})
    ])
]);

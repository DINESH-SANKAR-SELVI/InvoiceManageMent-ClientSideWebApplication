import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../loader.service';
import {
  transition,
  trigger,
  style,
  query,
  group,
  animate,
  animateChild,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('HomePage <=> AboutPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('200ms ease-out', style({ left: '100%', opacity: 0 }))],
        { optional: true }
      ),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideInAnimation],
})
export class DashboardComponent {
  auth: boolean = true;

  constructor(
    private route: Router,
    private currentPath: ActivatedRoute,
    public load: LoaderService,
    private contexts: ChildrenOutletContexts
  ) {}

  logout(){
    this.route.navigate(['login']);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}

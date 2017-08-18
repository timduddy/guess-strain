import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/card.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { Title } from '@angular/platform-browser';

const SMALL_WIDTH_BREAKPOINT = 1024;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'Dakine 420 Strain Game';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    if (this.route.snapshot.children[0]) {
      const myData = this.route.snapshot.children[0].data;
      if (myData) {
        this.title = myData.title;
      }
    }
    this.setTitle(this.title);
    this.router.events
      // Only continue with navigation end events
      .filter(event => event instanceof NavigationEnd)
      // Swap the observable for the current route
      .map(() => this.route)
      // Loop the routes to find the last activated child
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      // Only continue for the primary router outlet
      .filter(route => route.outlet === 'primary')
      // Limit to just the data object
      .mergeMap(route => route.data)
      .subscribe((event: any) => {
        if (event.title) {
          this.title = event.title;
          this.setTitle(event.title);
        }
      });
  }

  isScreenSmall(): boolean {
    return window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).matches;
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/']);
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}

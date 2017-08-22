import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private subscription: Subscription;
  searchString: string;
  users;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.getUsers()
      .subscribe(items => {
        if (items) {
          this.users = items;
        }
    });
  }

  delete(id) {
    this.authService.deleteUser(id);
  }

}

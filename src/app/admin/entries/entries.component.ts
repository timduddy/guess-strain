import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CardService } from '../../services/card.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  private subscription: Subscription;
  entries: any;
  searchString: string;

  constructor(private auth: AuthService, private cs: CardService, private router: Router) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        // console.log(user);
      }
    });
    this.subscription = this.cs.getEntries()
      .subscribe(items => {
        if (items) {
          this.entries = items;
        }
      });
  }

  delete(entry) {
    this.cs.deleteEntry(entry);
  }

  deleteAll() {
    this.cs.clearEntries();
  }

  pickWinner() {
    for (let i = 0; i < this.entries.length; i++) {
      this.entries[i].winner = false;
    }
    const winner = Math.floor((Math.random() * this.entries.length));
    this.entries[winner].winner = true;
    // console.log(this.entries[winner]);
  }
}

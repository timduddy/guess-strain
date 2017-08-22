import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  private subscription: Subscription;
  cards: any;

  constructor(private cs: CardService) { }

  ngOnInit() {
    this.subscription = this.cs.getCards()
      .subscribe(items => {
        if (items) {
          this.cards = items;
        }
    });
  }

  enable(id) {
     this.cs.enableCard(id);
  }

  disable(id) {
    this.cs.disableCard(id);
  }

}

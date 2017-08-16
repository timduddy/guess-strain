import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/Rx';

@Injectable()

export class CardService {

  private cards: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) { }

  getCards(num) {
    this.cards = this.af
      .list('/strain-cards')
      .map( (arr) => arr.reverse() ) as FirebaseListObservable<any[]>;
    return this.cards;
  }

  getCard(id: string) {
    return this.af.object('/strain-cards/' + id);
  }

}

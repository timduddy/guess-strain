import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/Rx';

export class EntryModel {
  $key: string;
  $exists: () => {};
  name: string;
  phone: string;
  email: string;
  timestamp: Date;
  card_number: number;
  newsletter: boolean;
}

@Injectable()
export class CardService {

  private cards: FirebaseListObservable<any[]>;
  private entry: FirebaseListObservable<any>;
  private entries: FirebaseListObservable<any[]>;
  public entities: EntryModel[];

  constructor(private af: AngularFireDatabase) {
    af.list('/entries').subscribe(classes => {
        this.entities = classes;
    });
  }

  getCards(num) {
    this.cards = this.af
      .list('/strain-cards')
      .map( (arr) => arr.reverse() ) as FirebaseListObservable<any[]>;
    return this.cards;
  }

  getCard(id: string) {
    return this.af.object('/strain-cards/' + id);
  }

  enterContest(name: string, phone: string, email: string, card_number: number, newsletter: boolean) {
    const timestamp = Date.now();
      // trying to find an existing one ..
    const existing = this.entities &&
        this.entities.length &&
        this.entities.find(e =>
          e.email === email &&
          e.card_number === card_number
        );
    if (existing) {
      // we found one ..
      return false;
    } else {
      this.entry = this.af.list('/entries');
      this.entry.push({
          'name': name,
          'phone': phone,
          'email': email,
          'timestamp': timestamp,
          'card_number': card_number,
          'newsletter': newsletter
      });
        return true;
    }

  }

  getEntries() {
    this.entries = this.af
      .list('/entries')
      .map( (arr) => arr.reverse() ) as FirebaseListObservable<any[]>;
      return this.entries;
  }

  deleteEntry(entry: string) {
    const items = this.af.list('/entries');
    items.remove(entry);
  }

  clearEntries() {
    const items = this.af.list('/entries');
    items.remove();
  }


}

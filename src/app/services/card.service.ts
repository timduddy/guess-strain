import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/Rx';

@Injectable()
export class CardService {

  public cards: FirebaseListObservable<any[]>;
  public entry: FirebaseListObservable<any>;
  public entries: FirebaseListObservable<any[]>;
  public entities: any[];

  constructor(private af: AngularFireDatabase) {
    af.list('/entries').subscribe(classes => {
        this.entities = classes;
    });
  }

  getCards() {
    this.cards = this.af
      .list('/strain-cards')
      .map( (arr) => arr ) as FirebaseListObservable<any[]>;
    return this.cards;
  }

  getLastCard() {
    this.cards = this.af
        .list('/strain-cards')
        .map ( arr => arr ) as FirebaseListObservable<any[]>;
    return this.cards;
  }

  getCard(id: string) {
    return this.af.object('/strain-cards/' + id);
  }

  enableCard(id: string) {
    const card = this.af.object('/strain-cards/' + id);
    card.update({ enabled: true });
  }

  disableCard(id: string) {
    const card = this.af.object('/strain-cards/' + id);
    card.update({ enabled: false });
  }

  updateCard(id: string, value: any) {

    value.strain = value.strain.toLowerCase()
    value.option1 = value.option1.toLowerCase()
    value.option2 = value.option2.toLowerCase()
    value.option3 = value.option3.toLowerCase();
    const options = [value.strain, value.option1, value.option2, value.option3 ];

    const card = this.af.object('/strain-cards/' + id);
    card.update({
      strain: value.strain,
      options: options,
      enabled: value.enabled
    }).then((res: any) => {
        console.log('success');
      })
      .catch((err: any) => {
        console.log('err');
      });
  }

  addCard(id: number, value: any, upload) {
    value.strain = value.strain.toLowerCase()
    value.option1 = value.option1.toLowerCase()
    value.option2 = value.option2.toLowerCase()
    value.option3 = value.option3.toLowerCase();
    const options = [value.strain, value.option1, value.option2, value.option3 ];

    const card = this.af.object('/strain-cards/' + id);
    card.set({
      strain: value.strain,
      options: options,
      enabled: value.enabled,
      image: upload.url
    }).then((res: any) => {
        console.log('success');
      })
      .catch((err: any) => {
        console.log('err');
      });
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

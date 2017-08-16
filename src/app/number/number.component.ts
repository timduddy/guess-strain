import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  public card_number: string;
  private subscription: Subscription;
  private strain_card;
  private invalid: boolean;

  constructor(private router: Router,
              private db: AngularFireDatabase,
              private cs: CardService) { }

  ngOnInit() {
  }

  getCard() {
    this.subscription = this.cs.getCard(this.card_number)
      .subscribe(item => {
        if (item.$exists()) {
          this.router.navigate(['/number', this.card_number]);
        } else {
          this.invalid = true;
        }
      });
  }

}

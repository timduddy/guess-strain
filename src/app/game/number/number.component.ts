import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { CardService } from '../../services/card.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  // public card_number: string;
  cardForm: FormGroup;
  public subscription: Subscription;
  public strain_card;
  public invalid: boolean;

  constructor(private router: Router,
              private db: AngularFireDatabase,
              private cs: CardService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      card_number: '',
    });
  }

  getCard() {
    const values = this.cardForm.value;
    this.subscription = this.cs.getCard(values.card_number)
      .subscribe(item => {
        if (item.$exists() && item.enabled === true) {
          this.router.navigate(['/number', values.card_number]);
        } else {
          this.invalid = true;
        }
      });
  }

}

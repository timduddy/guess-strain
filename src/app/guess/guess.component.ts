import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { slideLeftToRight, slideUp } from '../../shared/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
  animations: [slideUp]
})
export class GuessComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  private subscription: Subscription;
  private strain_card;
  private answer;
  private incorrect;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: AngularFireDatabase,
              private cs: CardService) { }

  ngOnInit() {
    let id: string;
    this.route.params.take(1).subscribe(param => id = param['id']);
    this.subscription = this.cs.getCard(id)
      .subscribe(item => {
        if (item) {
          this.strain_card = item;
          console.log(this.strain_card);
        }
      });
  }

  guessStrain() {
    if (this.answer === this.strain_card.strain) {
      console.log('Correct!');
      this.router.navigate(['/entry']);
    } else {
      console.log('Incorrect!');
      this.incorrect = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

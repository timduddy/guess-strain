import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { slideLeftToRight, slideUp } from '../../../shared/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { CardService } from '../../services/card.service';

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

  public subscription: Subscription;
  public strain_card;
  public answer;
  public incorrect;
  public id;
  loading = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: AngularFireDatabase,
              private cs: CardService) { }

  ngOnInit() {
    // let id: string;
    this.route.params.take(1).subscribe(param => this.id = param['id']);
    this.subscription = this.cs.getCard(this.id)
      .subscribe(item => {
        if (item) {
          this.strain_card = item;
          this.shuffle(this.strain_card.options);
        }
      });
  }

  guessStrain() {
    if (this.answer === this.strain_card.strain) {
      this.router.navigate(['/entry'], { queryParams: { card: this.id } });
    } else {
      this.incorrect = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loaded() {
    this.loading = false;
    console.log('loaded');
  }

  shuffle(array) {
      let counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          const index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          const temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }

      return array;
  }

}

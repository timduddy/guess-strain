import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { slideLeftToRight, slideUp } from '../../../shared/animations';
import { CardService } from '../../services/card.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  animations: [slideUp]
})
export class EntryComponent implements OnInit {

  private name: string;
  private phone: string;
  private email: string;
  private card_number: number;
  private newsletter = true;
  private sub: any;
  private duplicate = false;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  constructor(private cs: CardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.card_number = +params['card'] || 0;
      });
  }

  submitEntry() {
      if (this.cs.enterContest(this.name, this.phone, this.email, this.card_number, this.newsletter)) {
        this.router.navigate(['/game/thanks']);
      } else {
        this.duplicate = true;
      }
  }

}

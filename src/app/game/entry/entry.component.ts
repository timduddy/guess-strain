import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { slideLeftToRight, slideUp } from '../../../shared/animations';
import { CardService } from '../../services/card.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  animations: [slideUp]
})
export class EntryComponent implements OnInit {

  entryForm: FormGroup;
  /*public name: string;
  public phone: string;
  public email: string;
  public newsletter = true;*/
  public card_number: number;
  public sub: any;
  public duplicate = false;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  constructor(private cs: CardService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.card_number = +params['card'] || 0;
      });

    this.entryForm = this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        newsletter: true
    });
  }

  submitEntry() {
      const values = this.entryForm.value;
      if (this.cs.enterContest(values.name, values.phone, values.email, this.card_number, values.newsletter)) {
        this.router.navigate(['/thanks']);
      } else {
        this.duplicate = true;
      }
  }

}

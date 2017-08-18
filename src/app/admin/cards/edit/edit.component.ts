import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public subscription: Subscription;
  cardForm: FormGroup;
  strain_card: any;
  id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cs: CardService,
              private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.route);
    this.route.params.take(1).subscribe(param => this.id = param['id']);
    this.subscription = this.cs.getCard(this.id)
      .subscribe(item => {
        if (item) {
          this.strain_card = item;
          console.log(this.strain_card);
        }
      });

    this.cardForm = this.fb.group({
        strain: ['', [Validators.required]],
        option1: ['', [Validators.required]],
        option2: ['', [Validators.required]],
        option3: ['', [Validators.required]]
    });
  }

}

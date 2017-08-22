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
  private sub: any;
  cardForm: FormGroup;
  strain_card: any;
  id: string;
  strain = '';
  options = ['', '', ''];
  enabled = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cs: CardService,
              private fb: FormBuilder) {
              }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
    });

    this.subscription = this.cs.getCard(this.id)
    .subscribe(item => {
      if (item) {
        this.strain_card = item;
        this.updateForm();
      }
    });
    this.cardForm = this.fb.group({
        strain: [this.strain, [Validators.required]],
        option1: [this.options[0], [Validators.required]],
        option2: [this.options[1], [Validators.required]],
        option3: [this.options[2], [Validators.required]],
        enabled: this.enabled
    });

  }

  updateForm() {
    this.strain = this.strain_card.strain;
    this.options = this.strain_card.options;
    this.enabled = this.strain_card.enabled;
    const index = this.options.indexOf(this.strain);
    if (index > -1) {
        this.options.splice(index, 1);
    }
    this.cardForm = this.fb.group({
        strain: [this.strain, [Validators.required]],
        option1: [this.options[0], [Validators.required]],
        option2: [this.options[1], [Validators.required]],
        option3: [this.options[2], [Validators.required]],
        enabled: this.enabled
    });
  }

  onSubmit(id) {
    const formModel = this.cardForm.value;
    this.cs.updateCard(id, formModel);
    console.log('submitted');
  }

}

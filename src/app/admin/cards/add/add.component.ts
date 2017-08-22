import { Component, OnInit, EventEmitter } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import * as firebase from 'firebase';

import { UploadService } from '../../../services/upload.service';
import { Upload } from '../../../services/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public subscription: Subscription;
  cardForm: FormGroup;
  cards: any;
  id = 0;
  selectedFiles: FileList;
  currentUpload: Upload;
  enabled: true

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cs: CardService,
              private fb: FormBuilder,
              private upSvc: UploadService) {
              }

  ngOnInit() {

    this.subscription = this.cs.getLastCard()
    .subscribe(item => {
      if (item) {
        this.id = item[item.length - 1].$key;
        this.id++;
        // console.log(this.id);
      }
    });
    this.cardForm = this.fb.group({
        number: [this.id, [Validators.required]],
        strain: ['', [Validators.required]],
        option1: ['', [Validators.required]],
        option2: ['', [Validators.required]],
        option3: ['', [Validators.required]],
        enabled: true,

    });
  }



  onSubmit() {
    const formModel = this.cardForm.value;
    // this.cs.addCard(this.id, formModel);
    this.uploadSingle(formModel.number, formModel);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle(id, value) {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(id, value, this.currentUpload);
  }

}

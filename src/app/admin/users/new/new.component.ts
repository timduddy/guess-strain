import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/subscription';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Password } from './password';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public subscription: Subscription;
  userForm: FormGroup;
  mismatch = false;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,  Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: Password.MatchPassword
    });
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      } else {
        return {
          mismatchedPasswords: false
        };
      }
    }
  }

  onSubmit() {
    const formModel = this.userForm.value;
    // this.cs.addCard(this.id, formModel);
    this.authService.registerUser(formModel.email, formModel.password, formModel.name);
  }

}

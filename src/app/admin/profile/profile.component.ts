import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/subscription';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public subscription: Subscription;
  public profile;
  profileForm: FormGroup;
  id;

  constructor(public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.authService.user.subscribe((user) => {
      if (user) {
        this.id = user.uid;
        this.subscription = this.authService.getProfile(user.uid)
        .subscribe(item => {
          if (item) {
            this.updateForm(item.name, item.email);
            // console.log(item);
          }
        });
      }
    });
  }

  updateForm(name: string, email: string) {
    this.profileForm = this.fb.group({
        name: [name, [Validators.required]],
        email: [email, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    const values = this.profileForm.value;
    this.authService.updateUser(this.id, values);
  }

  resetPassword(email: string) {
    // console.log(email);
    return this.authService.sendPasswordResetEmail(email);
  }

}

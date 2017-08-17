import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginForm: FormGroup;
  processing: boolean;
  showPassword = false;
  progressColor: string;
  authError: string;
  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Please enter a valid email address',
    },
    'password': {
      'required': 'Password is required.'
    }
  };

  constructor(public router: Router,
              private route: ActivatedRoute,
              public authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        // console.log(user);
        this.router.navigate(['/admin']);
      }
    });
    this.createForm();
    this.redirectOnLogin();
    this.resetProgress();
  }

  // login() {
  //   this.authService.login(this.email, this.password);
  //   this.email = this.password = '';
  // }
    private redirectOnLogin() {
    const redirect = this.route.snapshot.queryParams['redirectURL'];
    // Watch the user
    this.authService.user.subscribe((user) => {
      // console.log('User', user);
      // Probably need to do more like check permissions instead of assuming a redirect
      if (user && redirect) {
        this.router.navigate([redirect]);
      }

    });
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  private resetProgress() {
    this.processing = false;
    this.progressColor = 'primary';
    // this.progressColor = 'success';
  }

  private onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;

    for (const field of Object.keys(this.formErrors)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  public login() {
    this.progressColor = 'primary';
    this.processing = true;
    this.authError = '';
    const values = this.loginForm.value;
    // console.log('Do Login', this.loginForm.value);
    this.authService.signInWithEmailAndPassword(values.email, values.password).then((user: firebase.User) => {
    }).catch((error) => {
      this.progressColor = 'warn';
      this.authError = error.message;
      setTimeout(() => {
        this.processing = false;
      }, 1000);
      // console.error(error);
    });
    // this.authService.login();
    // this.authService.login().subscribe(() => {
    //   this.setMessage();
    //   if (this.authService.isLoggedIn) {
    //     // Get the redirect URL from our auth service
    //     // If no redirect has been set, use the default
    //     const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/dashboard';
    //     const navigationExtras: NavigationExtras = {
    //       preserveQueryParams: true,
    //       preserveFragment: true
    //     };
    //     // Redirect the user
    //     this.router.navigate([redirect], navigationExtras);
    //   }
    // });
  }

  logout() {
    this.authService.logout();
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  public isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
    this.user.subscribe((user) => {
      // console.log('Auth service', user);
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
      /* OLD WAY
      this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/admin']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });*/
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  sendPasswordResetEmail(email: string) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }
}

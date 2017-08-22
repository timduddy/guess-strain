import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  profile: FirebaseListObservable<any>;
  public isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public firebaseAuth: AngularFireAuth,
              private router: Router,
              private af: AngularFireDatabase,
              private http: Http) {
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

  getUsers() {
    this.profile = this.af
      .list('/users')
      .map( (arr) => arr ) as FirebaseListObservable<any[]>;
    return this.profile;
  }

  getProfile(id: string) {
    return this.af.object('/users/' + id);
  }

  updateUser(id: string, value: any) {
    const user = this.af.object('/users/' + id);
    user.update({
      name: value.name,
      email: value.email
    });
  }

  registerUser(email, password, name) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const info = {'email': email, 'password': password, 'returnSecuretoken': true};
    const key = 'AIzaSyDpJvsetu51KlTYv-AwcLie0_FqXjdL7s8';
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + key;
    let result: any;
    return this.http.post(url, info, { headers: headers })
                    .map((res: Response) => res.json())
                    .subscribe(res => {
                      result = res;
                      this.addUserProfile(result.localId, name, email);
                      // console.log(result.localId);
                    });

    /* Works but auto logs the user in...
    const authRef = firebase.auth();
    return authRef.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      console.log(error.message);
    });*/
  }

  addUserProfile(id: string, name: string, email: string) {
    const user = this.af.object('/users/' + id);
    user.set({
      name: name,
      email: email
    });
  }

  deleteUser(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const info = {'localId': id };
    const key = 'AIzaSyDpJvsetu51KlTYv-AwcLie0_FqXjdL7s8';
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/deleteAccount?key=' + key;
    let result: any;
    return this.http.post(url, info, { headers: headers })
                    .map((res: Response) => res.json())
                    .subscribe(res => {
                      result = res;
                      this.deleteUserProfile(id);
                      console.log(result);
                    });
  }

  deleteUserProfile(id) {
    const users = this.af.list('/users');
    users.remove(id);
  }

}

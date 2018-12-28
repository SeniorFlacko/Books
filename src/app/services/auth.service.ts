import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private provider = new firebase.auth.GoogleAuthProvider();

  constructor(
    private session: SessionService,
    private router: Router
    ) { }

  login(){
    firebase.auth().signInWithPopup(this.provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // let token = result.credential.accessToken;
      // The signed-in user info.
      let {displayName, email} = result.user;
      const user ={
        displayName,
        email,
      }

      console.log(user);
      this.session.setUser(user);
      
      // ...
    }).catch(function(error) {
      console.error(error);
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
    });
  }

  logout(){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.session.clearUser();
      this.router.navigate(['']);
    }).catch(function(error) {
      // An error happened.
      console.error(error);
    });
  }

  get isAuthenticated(){
    if (this.session.getUser()!=null){
      return true;
    }
    return false;
  }
}

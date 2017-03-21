import { Injectable } from '@angular/core';
import * as Firebase from 'firebase';

@Injectable()

export class AuthData {
  public fireAuth: any;
  public userProfile: any;
  public googleProvider: any;
  public facebookProvider: any;

  constructor() {
    this.googleProvider = new Firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new Firebase.auth.FacebookAuthProvider();
  }

  public loginUserGoogle() {
    return Firebase.auth().signInWithPopup(this.googleProvider)
  }

  public loginUserFacebook() {
    return Firebase.auth().signInWithPopup(this.facebookProvider)
  }

  public loginUser(email: string, password: string): any {
    return Firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public signupUser(email: string, password: string): any {
    return Firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public resetPassword(email): any {
    return Firebase.auth().sendPasswordResetEmail(email);
  }

  public logoutUser(): any {
    return Firebase.auth().signOut();
  }
}

import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { AuthData }               from '../services/auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare const FB: any;

@Injectable()

export class FacebookService {
  private appId: string;
  private observer: any;

  constructor(
    private authData: AuthData
  ) {
    if (window.location.hostname !== 'localhost') {
      this.appId = '954999384605058';
    } else {
      this.appId = '955002201271443';
    }
    try {
      FB.init({
        appId: this.appId,
        cookie: false,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.5' // use graph api version 2.5
      });

    } catch (err) {
      console.warn('error loading Facebook', err);
    }
  }

  tryRegisterUser(response: any) {
    response.registrationType = 'facebook';

    return this.authData.signup(response)
      .subscribe(
      (data: any) => {
        // set success message and pass true paramater
        // to persist the message after redirecting to the login page
        this.observer.complete('User Successfully registered');
      },
      (error: any) => this.observer.error(error));
  }

  loginInApp(user: any) {
    return this.authData.login(user.email, user.password).subscribe(
      (data: any) => {
        return 'User LogedIn';
      },
      (error: any) => {
        if (error.json().userRegistered) {
          this.observer.error(error);
        }

        this.tryRegisterUser(user);
      });
  }

  getUserDataOnLogin () {
    return new Promise((resolve, reject) => {
      FB.api('/me', {
        locale: 'en_US',
        fields: 'first_name,last_name,email,location,picture'
      }, (response: any) => {
        // Idea is to save FB id as user password
        response.password = response.id;
        response.image = response.picture.data.url;
        response.firstName = response.first_name;
        response.lastName = response.last_name;

        this.loginInApp(response);
      });
    });
  }

  public onFacebookLoginClick() {

    return new Observable(observer => {
      this.observer = observer;

      FB.login((response: any) => {
        if (response.authResponse) {
          this.getUserDataOnLogin();
        } else {
          this.observer.error(new Error('User cancelled login or did not fully authorize.'));
        }
      }, { scope: 'email,user_location', return_scopes: true });
    });
  }
}

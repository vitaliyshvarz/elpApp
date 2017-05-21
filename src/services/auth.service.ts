import { Injectable, OnInit }     from '@angular/core';
import { Http, Response }         from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import { Logged }                 from '../definitions/logged';
import { LoggedService }          from '../services/logged.service';
import { User }                   from '../models/user';
import { BACKEND_API }            from '../config/backendConfig';
import { SessionService }         from '../services/session.service';
import { Subject }                from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare const FB: any;
declare const gapi: any;

@Injectable()

export class AuthData {
  private subject: Subject<{}> = new Subject<{}>();
  public userProfile: any;
  public googleProvider: any;
  public facebookProvider: any;
  private logged: Logged;
    private coords: any;

  constructor(
      private http: Http,
      private loggedService: LoggedService,
      private sessionService: SessionService
  ) { }


  login(email: string, password: string) {
      return this.http.post(BACKEND_API.login, {
          email: email,
          password: password
      }).map((response: Response) => {
          let user = response.json().user;
          let token = response.json().token;

          if (user && token) {
              // store user details and jwt token in local storage
              // to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('sessionToken', JSON.stringify(token));
              this.logged = {
                  email: user.email,
                  firstName: user.firstName
              };
              this.loggedService.setLogged(this.logged);
          }
      }).catch((error: any) => error.json());
  }

  public signup(userData: any) {
      let user = new User({
          password: userData.password,
          email: userData.email,
          registrationType: userData.registrationType,
          registrationTime: new Date()
      });


      return this.http.post(BACKEND_API.signup, user)
          .map((response: Response) => {
              console.log(response);
              if (response.status === 200) {
                  let user = response.json().user;
                  let token = response.json().token;

                  if (user && token) {
                      // store user details and jwt token in local storage
                      // to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(user));
                      localStorage.setItem('sessionToken', JSON.stringify(token));
                      this.logged = {
                          email: user.email,
                          firstName: user.firstName
                      };
                      this.loggedService.setLogged(this.logged);
                  }

                  this.subject.next(status);
              }
              return response;
          })
          .catch((error: any) => Observable.throw(error.json().message || error.json().errmsg || 'Error create user'));
  }

  logout() {
      return new Promise((resolve, reject) => {
        // remove user from local storage to log user out
        try {
            gapi.auth.signOut();
        } catch (err) {
            console.warn('google logout not available', err);
        }
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionToken');
        try {
            if (FB.getAuthResponse()) {
                FB.logout();
            }
        } catch (err) {
            console.warn('FB logout not available');
        }
        this.loggedService.setLogged(this.logged);

        resolve();
      });
  }

  isAdmin(user: User): Observable<any> {
      return this.http.get(BACKEND_API.getCurrentUser, this.sessionService.addTokenHeader())
          .map((response: Response) => {
              const resultUser = response.json();
              if (resultUser && resultUser.accountType === 'admin') {
                  return true;
              }
          })
          .catch((error: any) => Observable.throw(error.json().message || 'Error isAdmin'));
  }

  sendRecoveryPassEmail(email: string): Observable<{}> {
      return this.http.post(BACKEND_API.sendEmailRecovery, { email: email })
          .map((response: Response) => response.json())
          .catch((error: any) => Observable.throw(error.json().message || 'Error sending Recovery email'));
  }

  changePassword(params: any): Observable<{}> {
      return this.http.post(BACKEND_API.changePassword, params, this.sessionService.addTokenHeader())
          .map((response: Response) => response.json())
          .catch((error: any) => Observable.throw(error.json().message || 'Error sending Recovery email'));
  }
}

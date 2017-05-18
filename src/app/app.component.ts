import { Component, NgZone } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthData } from '../services/auth.service';
import { LoggedService } from '../services/logged.service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  public rootPage: any = HomePage;
  user = {};
  data: any;
  userName: any;
  loading: any;

  constructor(
    public authData: AuthData,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private zone: NgZone,
      private loggedService: LoggedService
  ) {

    this.loggedService.getLogged().subscribe(logged => {
        this.checkUserData();
    });

    this.checkUserData()

    platform.ready().then(() => StatusBar.styleDefault());
  }

  checkUserData() {
      const userData: any = localStorage.getItem('currentUser');
      const user = !!userData ? JSON.parse(userData) : null;

      this.userName = new Promise<string>((resolve) => {

        this.zone.run(() => {
          if (user && user.displayName) {
            resolve(user.displayName);
          } else if (user && user.email) {
            resolve(user.email);
          } else {
            resolve('NO USER DATA');
          }
          if (user) {
            // user logged in
            this.user = user;
            this.rootPage = HomePage;
          } else {
            // user not logged in
            this.rootPage = LoginPage;
            this.user = {};
          }
        });
      });
  }

  public logout() {
    this.authData.logout()
      .then(status => this.rootPage = HomePage)
      .catch(err => console.error('error in logout', err));

    this.loading = this.loadingCtrl.create();
    this.loading.present().then(() => {
      this.loading.dismiss();
    });;
  }
}

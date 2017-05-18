import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, MenuController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { HttpModule } from '@angular/http';


import { AuthData } from '../services/auth.service';
import { LoggedService } from '../services/logged.service';
import { SessionService } from '../services/session.service';

// Import the firebase Module
 import * as Firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXJdmFDX4viPCnjDMFFs1tmvXObbcJ200",
  authDomain: "eatlikepro-c3c21.firebaseapp.com",
  databaseURL: "https://eatlikepro-c3c21.firebaseio.com",
  storageBucket: "eatlikepro-c3c21.appspot.com",
  messagingSenderId: "1022163181712"
};

Firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData,
    LoggedService,
    SessionService
  ]
})
export class AppModule { }

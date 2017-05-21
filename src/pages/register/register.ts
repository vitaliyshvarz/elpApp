import {
  NavController,
  LoadingController,
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../services/auth.service';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  passwordMatch: boolean = false;

  constructor(
    public nav: NavController,
    public authData: AuthData,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      repeatPassword: ['', Validators.compose([Validators.required])]
    }, { validator: this.matchingPasswords('password', 'repeatPassword') })
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: any): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser() {
    this.submitAttempt = true;

    if (!this.signupForm.valid) {
      // TODO error handling here
      console.log(this.signupForm.value);
    } else {
      const user = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        registrationType: 'email'
      }
      this.authData.signup(user).subscribe(() => {
        this.nav.setRoot(HomePage);
      }, (error) => {
        this.loading.dismiss().catch(() => { });
        let alert = this.alertCtrl.create({
          message: error.json().errmsg || error.json().message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present().then(() => {
        this.loading.dismiss().catch(() => { });
      });
    }
  }
}

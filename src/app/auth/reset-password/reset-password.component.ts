import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPComponent {

  resetPForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    // password: new FormControl('', [ Validators.required, Validators.min(6) ])
  });

  passwordAndCodeForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    code: new FormControl('', [Validators.required, Validators.min(3)])
  });

  hide = false;
  showPasswordAndCode = false;

  get emailInput() { return this.resetPForm.get('email'); }
  get passwordInput() { return this.passwordAndCodeForm.get('password'); }
  get codeInput() { return this.passwordAndCodeForm.get('code'); }


  constructor(
    public auth: AuthService,
    private _notification: NotificationService,
    private _router: Router,
    private _loader: LoaderService) { }

  getEmailInputError() {

    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
  }

  getCodeInputError() {
    if (this.codeInput.hasError('required')) {
      return 'A confirmation code is required.';
    }
  }

  requestForgotPassword() {
    //this._loader.show();
    this.auth.requestForgotPassword(this.emailInput.value)
      .then((msg: any) => {
        this.resetPForm.get('email').disable()
        this.showPasswordAndCode = true
        //this._loader.hide();
        this._notification.show(`code has been sent to your email ${this.emailInput.value}`);
      })
      .catch((error: any) => {
        //this._loader.hide();
        this._notification.show(error.message);
      })
  }

  forgotPasswordSubmit() {
    //this._loader.show();
    this.auth.forgotPasswordSubmit(this.emailInput.value, this.codeInput.value, this.passwordInput.value)
      .then((msg: any) => {
        //this._loader.hide();
        this._notification.show(`password updated successfully`);
        this._router.navigate(['auth/signin']);
      })
      .catch((error: any) => {
        //this._loader.hide();
        this._notification.show(error.message);
      })
  }
}

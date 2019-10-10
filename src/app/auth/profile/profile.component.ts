import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { NotificationService } from 'src/app/services/notification.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { MEDICARE_DRG_CODES } from '../../medicareConstants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.min(10)]),
    fname: new FormControl('', [Validators.min(2)]),
    lname: new FormControl('', [Validators.min(2)])
  });
  procedureForm: FormGroup = new FormGroup({
    procName: new FormControl(''),
    drg: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.maxLength(100)]),
    insurance: new FormControl('', [Validators.maxLength(100)]),
    cost: new FormControl('', [Validators.required])
  });
  currentAvatarUrl: string;
  avatar: string;
  deleteAvatar = false;
  profile: any = {};
  user: CognitoUser;
  drgCodes: string[];
  filteredCodes: string[];

  get emailInput() { return this.profileForm.get('email'); }
  get fnameInput() { return this.profileForm.get('fname'); }
  get lnameInput() { return this.profileForm.get('lname'); }
  get phoneInput() { return this.profileForm.get('phone'); }

  get procNameInput() { return this.procedureForm.get('procName'); }
  get drgInput() { return this.procedureForm.get('drg'); }
  get locInput() { return this.procedureForm.get('location'); }
  get insurInput() { return this.procedureForm.get('insurance'); }
  get costInput() { return this.procedureForm.get('cost'); }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private http: HttpClient,
    private _notification: NotificationService,
    public loading: LoaderService) { }

  ngOnInit() {
    this.getUserInfo();
    this.drgCodes = MEDICARE_DRG_CODES;
    this.filteredCodes = this.drgCodes;
  }

  async getUserInfo() {
    this.profile = await Auth.currentUserInfo();
    this.user = await Auth.currentAuthenticatedUser();
    if (this.profile.attributes['profile']) {
      this.avatar = this.profile.attributes['profile'];
      this.currentAvatarUrl = await Storage.vault.get(this.avatar) as string;
    }
    this.fnameInput.setValue(this.profile.attributes['given_name']);
    this.lnameInput.setValue(this.profile.attributes['family_name']);
    this.phoneInput.setValue(this.profile.attributes['phone_number']);
    //this.loading.hide();
  }

  getEmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  signOut() {
    this._authService.signOut()
      .then(() => this._router.navigate(['auth/signin']))
  }

  onAvatarUploadComplete(data: any) {
    this.avatar = data.key;
    //this.loading.hide();
  }

  onAvatarRemove() {
    this.avatar = undefined;
    this.currentAvatarUrl = undefined;
    this.deleteAvatar = true;
  }

  async editProfile() {
    try {
      let attributes = {
        'given_name': this.fnameInput.value,
        'family_name': this.lnameInput.value,
        'phone_number': this.phoneInput.value
      };
      if (this.avatar) {
        attributes['profile'] = this.avatar;
      }
      await Auth.updateUserAttributes(this.user, attributes);
      if (!this.avatar && this.deleteAvatar) {
        this.user.deleteAttributes(["profile"], (error) => {
          if (error) console.log(error);
          this._notification.show('Your profile information has been updated.');
        });
      } else {
        this._notification.show('Your profile information has been updated.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  setCode(s: string) {
    for (const drg of this.drgCodes) {
      if (s.substr(0, 3) === drg.substr(0, 3)) {
        this.drgInput.setValue(s)
        return;
      }
    }
  }

  filter() {
    this.filteredCodes = [];
    for (const code of this.drgCodes) {
      if (code.toLowerCase().includes(this.drgInput.value.toLowerCase())) {
        this.filteredCodes.push(code);
      }
    }
  }
  
  submitForm() {
    // double check validation
    const validDRG = this.drgCodes.includes(this.drgInput.value)
    const validCost = Number.isInteger(this.costInput.value)

    if (!validDRG || !validCost) {
      console.log("form is invalid")
      return
    }

    console.log("Name: " + this.procedureForm.value.procName);
    console.log("DRG: " + this.procedureForm.value.drg.substr(0, 3));
    console.log("Location: " + this.procedureForm.value.location);
    console.log("Insurance: " + this.procedureForm.value.insurance);
    console.log("Price: " + this.procedureForm.value.cost);
    this.http.post('https://qra9m7iyyd.execute-api.us-east-1.amazonaws.com/sendEmail/handleuserdata', {
      "name": this.procedureForm.value.procName,
      "drg": this.procedureForm.value.drg.substr(0, 3),
      "location": this.procedureForm.value.location,
      "cost": this.procedureForm.value.cost,
      "insurance": this.procedureForm.value.insurance,
      "type": "post"
    })
      .subscribe(
        data => {
          console.log('data sent!');
        },
        error => {
          console.log("Error: ", error);
        }
      );
  }
}

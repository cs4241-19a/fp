import { Component, OnInit } from '@angular/core';
import {PRIVACY} from "../Privacy";
import {TERMS} from "../Terms";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  termsID = 'termsmodal';
  privacyID = 'privacymodal';
  title = 'Care Compare';
  date = new Date();
  currentyear: number;
  termsTitle = 'Terms of Service';
  privacyTitle = 'Privacy Statement';
  termsBody =  TERMS;
  privacyBody = PRIVACY;

  constructor() { }

  ngOnInit() {
    this.currentyear = this.date.getFullYear();
  }

}

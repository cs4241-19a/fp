import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sendEmail() {
    const name = (<HTMLInputElement>document.querySelector('#name')).value
    const email = (<HTMLInputElement>document.querySelector('#email')).value
    const subject = (<HTMLInputElement>document.querySelector('#subject')).value
    const message = (<HTMLInputElement>document.querySelector('#message')).value
    this.http.post('https://qra9m7iyyd.execute-api.us-east-1.amazonaws.com/sendEmail/sendemail', {
      "name": name,
      "email": email,
      "subject": subject,
      "message": message
    })
    .subscribe(
      data => {
        alert('Message sent!');
      },
      error => {
        console.log("Error", error);
      }
    );
  }

}

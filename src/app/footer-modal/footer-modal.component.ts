import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer-modal',
  templateUrl: './footer-modal.component.html',
  styleUrls: ['./footer-modal.component.css']
})
export class FooterModalComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  @Input() ID: string;

  constructor() { }

  ngOnInit() {
  }

}

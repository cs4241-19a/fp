import { Component, Input, OnInit } from '@angular/core';
import {User} from '../shared/models/user.model';

@Component({
    selector: 'app-notification-list',
    template: `
        <nb-card style="margin-bottom: 0">
            <nb-card-header>Notifications</nb-card-header>
            <nb-list>
                <nb-list-item *ngFor="let notif of user.notifications">{{notif.text}} <span style="font-size: 10px; margin-left: 10px">{{notif.date}}</span></nb-list-item>
            </nb-list>
        </nb-card>
  `
})
export class NotificationListComponent implements OnInit {

    @Input()
    user: User;

    ngOnInit(): void {
        console.log(this.user);
    }
}

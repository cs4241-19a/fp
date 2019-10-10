import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-user-list',
    template: `
        <nb-card>
            <nb-card-header>Members</nb-card-header>
            <nb-list>
                <nb-list-item *ngFor="let user of users; let i = index">
                    <div class="row">
                        <div class="col-md-11">
                            <nb-user [name]="user.username" [title]="user.email" [picture]="user?.avatarUrl"></nb-user>
                        </div>
                        <div class="col-md-1">
                            <b>Weight lost:</b> {{user.stats.starting_weight - user.logs[0]?.weight}} {{user.logs[0]?.unit}}
                        </div>
                    </div>
                </nb-list-item>
            </nb-list>
        </nb-card>
    `,
})
export class UserListComponent {
    @Input() users;
}

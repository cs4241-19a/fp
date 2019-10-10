import {Component, OnInit} from '@angular/core';
import {ToastComponent} from '../shared/toast/toast.component';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/user.model';
import {PactService} from '../services/pact.service';
import {Pact} from '../shared/models/pact.model';

@Component({
    selector: 'app-pact-settings',
    templateUrl: './pact-settings.component.html',
    styleUrls: ['./pact-settings.component.scss']
})
export class PactSettingsComponent implements OnInit {
    pact: Pact;
    user: User;
    isLoading = true;

    constructor(public auth: AuthService,
                public toast: ToastComponent,
                private userService: UserService,
                private pactService: PactService) {
    }

    ngOnInit() {
        this.getPact();
    }

    getPact() {
        this.userService.getUser(this.auth.currentUser).subscribe(
            data => {
                this.user = data;
                // @ts-ignore
                this.pactService.getPact(data.pact).subscribe(
                    pact => {
                        this.pact = pact;
                        console.log(pact);
                        this.isLoading = false;
                    }
                );
            }
        );
    }

    deleteUser(user: User) {
        if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
            this.userService.leavePact(user, this.pact).subscribe(
                res => {
                    this.toast.setMessage('user deleted successfully.', 'success');
                },
                error => console.log(error),
                () => this.getPact()
            );
        }
    }

    save(pact: Pact) {
        console.log(pact);
        this.pactService.editPact(pact).subscribe(
            res => this.toast.setMessage('Pact settings saved!', 'success'),
            error => console.log(error)
        );
    }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastComponent} from '../shared/toast/toast.component';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../shared/models/user.model';
import {Pact} from '../shared/models/pact.model';
import {environment} from '../../environments/environment';
import {DataSharingService} from '../services/data-sharing.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

    user: User;
    isLoading = true;
    fitbitUrl: string;
    fileToUpload: File = null;
    form: FormGroup;
    imgSrc = '';


    constructor(private auth: AuthService,
                public toast: ToastComponent,
                private userService: UserService,
                private formBuilder: FormBuilder,
                private dataSharingService: DataSharingService) {
    }

    ngOnInit() {
        this.getUser();
        this.form = this.formBuilder.group({
            avatar: ['']
        });
    }

    getUser() {
        this.userService.getUser(this.auth.currentUser).subscribe(
            data => {
                this.user = data;
                console.log(data);

                // Use environment variables
                this.fitbitUrl = encodeURI(environment.fitbitUrl) + encodeURIComponent(data._id);
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('avatar').setValue(file);
        }
    }

    onSubmit() {
        this.userService.postFile(this.form.get('avatar').value, this.user).subscribe(data => {
            console.log(data);
            // @ts-ignore
            this.imgSrc = data.url;
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }

    setAvatar() {
        this.user.avatarUrl = this.imgSrc;
        this.save(this.user);
    }

    save(user: User) {
        console.log(user);
        this.userService.editUser(user).subscribe(
            res => this.toast.setMessage('account settings saved!', 'success'),
            error => console.log(error),
            () => this.dataSharingService.isUserUpdated.next(true)
        );
    }

}

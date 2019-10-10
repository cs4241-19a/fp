import {Component, OnInit, ChangeDetectorRef, TemplateRef} from '@angular/core';
import {Pact} from '../shared/models/pact.model';
import {User} from '../shared/models/user.model';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PactService} from '../services/pact.service';
import {NbDialogService, NbToastrService, NbIconConfig} from '@nebular/theme';
import {NbThemeService} from '@nebular/theme';
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';

@Component({
    selector: 'app-pact',
    templateUrl: './pact.component.html',
    styleUrls: ['./pact.component.scss']
})
export class PactComponent implements OnInit {
    pact: Pact;
    user: User;
    pactId = '';
    pactSecret = '';
    isLoading = true;

    results = [
        {name: 'Germany', value: 8940},
        {name: 'USA', value: 5000},
        {name: 'France', value: 7200},
    ];
    showLegend = true;
    showLabels = true;
    colorScheme: any;
    themeSubscription: any;

    firstForm: FormGroup;
    secondForm: FormGroup;

    constructor(private auth: AuthService,
                private toastrService: NbToastrService,
                private userService: UserService,
                private pactService: PactService,
                private cdRef: ChangeDetectorRef,
                private fb: FormBuilder,
                private dialogService: NbDialogService,
                private theme: NbThemeService) {

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            const colors: any = config.variables;
            this.colorScheme = {
                domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
            };
        });
    }

    ngOnInit() {
        this.firstForm = this.fb.group({
            firstCtrl: ['', Validators.required],
        });

        this.secondForm = this.fb.group({
            secondCtrl: ['', Validators.required],
            password: [''],
        });

        this.getPact();
    }

    getPact() {
        this.userService.getUser(this.auth.currentUser).subscribe(
            data => {
                this.user = data;
                // @ts-ignore
                this.pactService.getPact(data.pact).subscribe(
                    pact => {
                        this.isLoading = false;
                        this.pact = pact;
                        console.log(pact);
                    }
                );
            }
        );
    }

    onFirstSubmit() {
        this.firstForm.markAsDirty();
    }

    onSecondSubmit() {
        this.secondForm.markAsDirty();
    }

    createPact() {
        let pact = new Pact();
        pact.name = this.firstForm.value.firstCtrl;
        pact.private = this.secondForm.value.secondCtrl === 'private';
        pact.owner = this.user._id;
        pact.date_created = Date().toString();
        if (pact.private) {
            pact.password = this.secondForm.value.password;
        }

        this.pactService.createPact(pact).subscribe(
            res => {
                this.showToast('headphones-outline', 'You created the pact!', 'Success');
                this.pact = res;
                this.cdRef.markForCheck();
            },
            error => console.log(error)
        );
    }

    leavePact() {
        this.userService.leavePact(this.user, this.pact).subscribe(
            res => {
                this.showToast('headphones-outline', 'You left the pack!', 'Success');
                this.pact = undefined;
                this.cdRef.markForCheck();
            },
            error => console.log(error)
        );
    }

    joinPact() {
        let pact = new Pact();
        pact.name = this.pactId;
        pact.password = this.pactSecret;
        this.userService.joinPact(this.user, pact).subscribe(
            res => {
                console.log(res);
                // @ts-ignore
                if (res.error) {
                    this.showToast('headphones-outline', 'Incorrect Pact Secret!', 'Errpr');
                } else {
                    this.showToast('headphones-outline', 'You joined the pact!', 'Success');
                    // @ts-ignore
                    this.pact = res;
                    this.cdRef.markForCheck();
                }
            },
            error => console.log(error)
        );
    }

    /**
     * Open a dialog
     * @param dialog
     */
    open(dialog: TemplateRef<any>) {
        this.dialogService.open(dialog, {context: 'Are you sure?'});
    }

    /**
     * Show toast popup
     * @param iconName
     * @param message
     * @param title
     */
    showToast(iconName, message, title) {
        const iconConfig: NbIconConfig = {icon: iconName, pack: 'eva'};
        this.toastrService.show(message, title, iconConfig);
    }
}

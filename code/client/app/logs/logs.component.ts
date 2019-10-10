import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import {ToastComponent} from '../shared/toast/toast.component';
import {User} from '../shared/models/user.model';
import {Log} from '../shared/models/log.model';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {GoalDialogComponent} from '../@common/goal-dialog.component';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

    log = new Log();
    user : User;
    logs: Log[] = [];
    isLoading = true;
    isEditing = false;

    addLogForm: FormGroup;
    //name = new FormControl('', Validators.required);
    date = new FormControl(new Date(), Validators.required);
    unit = new FormControl('', Validators.required);
    weight = new FormControl('', Validators.required);

    constructor(private userService: UserService,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                public toast: ToastComponent,
                private dialogService: NbDialogService) {
    }

    ngOnInit() {
        this.getLogs();
        this.addLogForm = this.formBuilder.group({
            date: this.date,
            unit: this.unit,
            weight: this.weight
        });
    }

    getLogs() {
        this.userService.getUser(this.authService.currentUser).subscribe(
            data => {
                console.log(data);
                this.user = data;
                this.logs = data.logs;
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addLog() {
        this.userService.addLog(this.authService.currentUser, this.addLogForm.value).subscribe(
            data => {
                this.getLogs();
                this.addLogForm.reset();

                this.date = new FormControl(new Date(), Validators.required);
                this.unit = new FormControl('', Validators.required);
                this.weight = new FormControl('', Validators.required);
                this.addLogForm = this.formBuilder.group({
                    date: this.date,
                    unit: this.unit,
                    weight: this.weight
                });

                if (data.weight < this.user.stats.goal_weight){
                    this.open();
                }

                //check if user deserves badge
                this.getsBadge(data);

                this.toast.setMessage('Item added successfully.', 'success');
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableEditing(log: Log) {
        this.isEditing = true;
        this.log = log;
        this.log.date = new Date(this.log.date);
    }

    cancelEditing() {
        this.isEditing = false;
        this.log = new Log();
        this.toast.setMessage('item editing cancelled.', 'warning');
        // reload the cats to reset the editing
        this.getLogs();
    }

    editLog(log: Log) {
        this.userService.editLog(this.authService.currentUser, log).subscribe(
            () => {
                this.isEditing = false;
                this.toast.setMessage('item edited successfully.', 'success');
                //check if user deserves badge
                this.getsBadge(log);
            },
            error => console.log(error),
            () => this.getLogs()
        );
    }

    deleteLog(log: Log) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.userService.deleteLog(this.authService.currentUser, log).subscribe(
                () => {
                    const pos = this.logs.map(elem => elem._id).indexOf(log._id);
                    this.logs.splice(pos, 1);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }

    open() {
        this.dialogService.open(GoalDialogComponent);
    }

    getsBadge(logData){
        let weightBadge = {
            type : "GOAL_WEIGHT",
            message : "Wooo you reached your goal weight! This is amazing, keep it up!",
            imgUrl : "/assets/weight badge.png"
        };
        // console.log("weight goal achieved?", logData.weight === this.user.stats.goal_weight )
        // console.log("badge in there?", this.user.badges.some(item => item['type'] === weightBadge.type))
        if (logData.weight === this.user.stats.goal_weight && !this.user.badges.some(item => item['type'] === weightBadge.type)){
            this.user.badges.push(weightBadge);
            console.log("user badges before pusth", this.user.badges)
            this.userService.editUser(this.user).subscribe(data => {
                console.log('user edited: now looks like: ', data);
            },
                (err) => console.log(err),
                () => this.toast.setMessage('Congratulations, you just unlocked a new badge! Check it out on your profile.', 'success'))
        }
    }
}

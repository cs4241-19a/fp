import {Component, ViewChild, AfterViewInit, HostListener, OnInit, Input, EventEmitter} from '@angular/core';
import {jqxSchedulerComponent} from 'jqwidgets-ng/jqxscheduler';
import {AuthService} from '../services/auth.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {UserService} from '../services/user.service';
import {PactService} from '../services/pact.service';
import {User} from '../shared/models/user.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit {
    @ViewChild('scheduler', {static: false}) scheduler: jqxSchedulerComponent;
    @Input() customView;


    public innerWidth: any;
    public innerHeight: any;
    curPact: any;
    user: User;
    isLoading: boolean = true;

    source: any = {
        dataType: 'array',
        dataFields: [
            {name: 'id', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'location', type: 'string'},
            {name: 'subject', type: 'string'},
            {name: 'calendar', type: 'string'},
            {name: 'start', type: 'date', format: 'yyyy-MM-dd HH:mm'},
            {name: 'end', type: 'date', format: 'yyyy-MM-dd HH:mm'}
        ],
        id: 'id',
        localData: []
    };
    dataAdapter: any = new jqx.dataAdapter(this.source);
    date: any  = new jqx.date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    appointmentDataFields: any = {
        from: 'start',
        to: 'end',
        id: 'id',
        description: 'description',
        subject: 'subject',
        location: 'location',
        resourceId: 'calendar'
    };
    resources: any = {
        colorScheme: 'scheme05',
        dataField: 'calendar',
        source: new jqx.dataAdapter(this.source)
    };
    startingView = 'weekView';
    views: any[] = [
        'dayView',
        'weekView',
        'monthView',
        'agendaView'
    ];

    constructor(private auth: AuthService,
                public toast: ToastComponent,
                private userService: UserService,
                private pactService: PactService
    ) {
        this.innerWidth = window.innerWidth - window.innerWidth / 4.5;
        this.innerHeight = window.innerHeight - window.innerHeight / 5;
        console.log(this.innerWidth);
    }


    ngOnInit(): void {
        this.getUser();
        if (this.customView){
            this.views = this.customView;
            this.startingView = this.customView[0];
        }
    }


    //get current logged in user
    getUser() {
        this.userService.getUser(this.auth.currentUser).subscribe(
            data => {
                this.user = data;
                console.log('user is ', data);
                //get pact the user is part of
            },
            error => console.log(error),
            () => {
                this.getPact(this.user.pact);
            }
        );
    }

    //get pact user is part of
    //and add calendar of every user in the pact to master array of calendars
    getPact(userId) {
        this.pactService.getPact(userId).subscribe(
            data => {
                this.curPact = data;
                console.log('pact is ', data);
            },
            error => console.log(error),
            () => {
                console.log('boutta get calendars');
                this.getAllCalendars();
                this.isLoading = false;
            }
        );
    };


    //getting calendars of everyone that's part of a pact
    getAllCalendars() {
        if (!this.curPact){
            this.setCalElements(this.user.calendar);
            return this.user.calendar;
        }
        let pactMembers = this.curPact.users;
        let allCals = [];

        for (let user of this.curPact.users) {
            if (user.calendar !== undefined) {
                allCals = [].concat(allCals, user.calendar);
            }
        }
        console.log('all calendars ', allCals);

        //updating source of calendar
        this.setCalElements(allCals);
        return this.user.calendar;
    }


    ngAfterViewInit(): void {
        this.setReadOnly();
    }


    onAppointmentAdd(event: any): void {
        let newAppt = {};
        let args = event.args;
        let appointment = args.appointment;

        console.log(appointment);

        if (appointment) {
            newAppt = {
                id: appointment.id,
                description: appointment.description,
                subject: appointment.subject,
                start: appointment.originalData.start,
                end: appointment.originalData.end,
                calendar: this.user.username
            };
        }
        //adding new event to users calendar
        this.user.calendar.push(newAppt);
        this.userService.editUser(this.user).subscribe(data => {
                console.log('user edited: now looks like: ', data);
            },
            (err) => console.log(err),
            () => this.getPact(this.user.pact));
    };

    onAppointmentChange(event: any): void {
        let newAppt = {};
        let args = event.args;
        let appointment = args.appointment;

        if (appointment) {
            // if (appointment.originalData.calender != this.user.username){
            //     alert("Error! You can't delete someoen elses appointment");
            //     return;
            // }

            newAppt = {
                id: appointment.id,
                description: appointment.description,
                subject: appointment.subject,
                start: appointment.originalData.start,
                end: appointment.originalData.end,
                calendar: this.user.username
            };
            //adding new event to users calendar
            for (let i in this.user.calendar) {
                // @ts-ignore
                if (this.user.calendar[i].id == appointment.id) {
                    this.user.calendar[i] = newAppt;
                    break;
                }
            }

            this.userService.editUser(this.user).subscribe(data => {
                    console.log('user edited: now looks like: ', data);
                },
                (err) => console.log(err),
                () => this.getPact(this.user.pact));
        }
    };

    onAppointmentDelete(event: any): void {
        let args = event.args;
        let appointment = args.appointment;

        if (appointment) {
            // if (appointment.originalData.calender != this.user.username){
            //    alert("Error! You can't delete someoen elses appointment");
            //    return;
            // }

            console.log(appointment);
            //adding new event to users calendar
            let newCalendar = this.user.calendar.filter(function(appt) {
                // @ts-ignore
                return appt.id != appointment.id;
            });

            console.log(newCalendar);
            this.user.calendar = newCalendar;

            this.userService.editUser(this.user).subscribe(data => {
                    console.log('user edited: now looks like: ', data);
                },
                (err) => console.log(err),
                () => this.getPact(this.user.pact));
        }
    };

    // ready = (): void => {
    //     this.scheduler.scrollTop(700);
    // }

    setCalElements(allCals) {
        this.source =
            {
                dataType: 'array',
                dataFields: [
                    {name: 'id', type: 'string'},
                    {name: 'description', type: 'string'},
                    {name: 'location', type: 'string'},
                    {name: 'subject', type: 'string'},
                    {name: 'calendar', type: 'string'},
                    {name: 'start', type: 'date', format: 'yyyy-MM-dd HH:mm'},
                    {name: 'end', type: 'date', format: 'yyyy-MM-dd HH:mm'}
                ],
                id: 'id',
                localData: allCals
            };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.resources =
            {
                colorScheme: 'scheme05',
                dataField: 'calendar',
                source: new jqx.dataAdapter(this.source)
            };


        this.setReadOnly();
        this.scheduler.scrollTop(550);
    }

    setReadOnly(){
        if (this.customView) return;
        // TODO set some to read-only
        // console.log(this.source);
        // console.log(this.scheduler)
        this.scheduler.beginAppointmentsUpdate();
        for (let entry of this.source.localData){
            if (entry.calendar != this.user.username){
                console.log("entry", entry);
                this.scheduler.setAppointmentProperty(entry.id, 'readOnly', true);
                this.scheduler.setAppointmentProperty(entry.id, 'draggable', false);
                this.scheduler.setAppointmentProperty(entry.id, 'resizable', false);
            }
        }
        this.scheduler.endAppointmentsUpdate();
    }

    exportCalendar(format): void {
        console.log("export");
        this.scheduler.exportData(format);
    };
}


// generateAppointments(): any {
//   let appointments = new Array();
//   let appointment1 = {
//     id: "id1",
//     description: "George brings projector for presentations.",
//     location: "",
//     subject: "Quarterly Project Review Meeting",
//     calendar: "Room 1",
//     start: new Date(2018, 10, 23, 9, 0, 0),
//     end: new Date(2018, 10, 23, 16, 0, 0)
//   };

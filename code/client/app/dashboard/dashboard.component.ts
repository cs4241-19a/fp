import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbMenuItem, NbThemeService} from '@nebular/theme';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewChecked {

  imgSrc = "assets/raccoon.gif";

    menu: NbMenuItem[] = [
        {
            title: 'Dashboard',
            icon: 'home-outline',
            link: '/dashboard/about',
            home: true,
        },
        {
            title: 'Logs',
            link: '/dashboard/logs',
            icon: 'edit-outline',
        },
        {
            title: 'Admin',
            link: '/dashboard/admin',
            hidden: !this.auth.loggedIn || !this.auth.isAdmin,
            icon: 'person-outline',
        },
        {
            title: this.auth.currentUser.username,
            link: '/dashboard/profile',
            icon: 'person-outline'
        },
        {
            title: 'Pact',
            link: '/dashboard/pact',
            icon: 'people-outline'
        },
        {
            title: 'Board',
            link: '/dashboard/board',
            icon: 'layout-outline'
        },
        {
            title: 'Calendar',
            link: '/dashboard/calendar',
            icon: 'calendar-outline'
        },
        {
            title: 'Settings',
            link: '/dashboard/account',
            icon: 'settings-outline'
        }
    ];

    constructor(public auth: AuthService,
                private changeDetector: ChangeDetectorRef,
                private themeService: NbThemeService,
    ) {
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
        this.themeService.onThemeChange().subscribe((theme) => {
          if (theme.name == "default" || theme.name == "corporate"){
            this.imgSrc = "assets/raccoon.gif"
          } else {
            this.imgSrc ="assets/white-raccoon.gif"
          }
        });
    }
}

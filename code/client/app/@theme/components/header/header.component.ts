import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {AuthService} from '../../../services/auth.service';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NotificationListComponent} from '../../../@common/notification-list.component';
import {UserService} from '../../../services/user.service';
import {DataSharingService} from '../../../services/data-sharing.service';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    userPictureOnly: boolean = false;
    user: any;
    currentUser: any;

    listComponent = NotificationListComponent;

    themes = [
        {
            value: 'default',
            name: 'Light',
        },
        {
            value: 'dark',
            name: 'Dark',
        },
        {
            value: 'cosmic',
            name: 'Cosmic',
        },
        {
            value: 'corporate',
            name: 'Corporate',
        },
    ];

    currentTheme = 'default';
    userMenu = [
        {title: 'Profile', link: '/dashboard/profile', icon: 'person-outline'},
        {title: 'Settings', link: '/dashboard/account', icon: 'settings-outline',},
        {title: 'Log out', link: '/dashboard/logout', icon: 'unlock-outline',}];

    constructor(private sidebarService: NbSidebarService,
                private themeService: NbThemeService,
                private authService: AuthService,
                private userService: UserService,
                private breakpointService: NbMediaBreakpointsService,
                private dataSharingService: DataSharingService) {

        this.dataSharingService.isUserUpdated.subscribe(value => {
            this.userService.getUser(this.authService.currentUser).subscribe(
                data => {
                    this.currentUser = data;
                }
            );
        });
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;
        this.user = this.authService.currentUser;
        this.userService.getUser(this.authService.currentUser).subscribe(
            data => {
                this.currentUser = data;
            }
        );

        const {xl} = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$),
            )
            .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

        this.themeService.onThemeChange()
            .pipe(
                map(({name}) => name),
                takeUntil(this.destroy$),
            )
            .subscribe(themeName => this.currentTheme = themeName);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');

        return false;
    }
}

// Angular
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {JwtModule} from '@auth0/angular-jwt';
// Modules
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {RouterModule} from '@angular/router';
// Services
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
// Components
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AccountComponent} from './account/account.component';
import {AdminComponent} from './admin/admin.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DemoMaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//calendar
import { FormsModule } from '@angular/forms';

import {
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbUserModule,
    NbCalendarModule,
    NbStepperModule,
    NbRadioModule,
    NbToggleModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbDialogModule,
    NbPopoverModule,
    NbSelectModule,
    NbToastrModule,
    NbWindowModule, NbTooltipModule, NbProgressBarModule
} from '@nebular/theme';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import {NbAuthModule} from '@nebular/auth';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {PactService} from './services/pact.service';
import {PactComponent} from './pact/pact.component';
import {ThemeModule} from './@theme/theme.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthComponent} from './auth/auth.component';
import {LogsComponent} from './logs/logs.component';
import {CalendarComponent} from './calendar/calendar.component';
import {D3Module} from './d3/d3.module';
import {CommonModule} from './@common/common.module';
import {ProfileComponent} from './profile/profile.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';
import {BoardComponent} from './board/board.component';
import {PactSettingsComponent} from './pact-settings/pact-settings.component';
import {DataSharingService} from './services/data-sharing.service';
import { ExerciseComponent } from './exercise/exercise.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AccountComponent,
        AdminComponent,
        NotFoundComponent,
        PactComponent,
        DashboardComponent,
        AuthComponent,
        LogsComponent,
        CalendarComponent,
        ProfileComponent,
        PrivacyPolicyComponent,
        TermsOfServiceComponent,
        BoardComponent,
        PactSettingsComponent,
        ExerciseComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                // whitelistedDomains: ['localhost:3000', 'localhost:4200']
            },
        }),
        CommonModule,
        FormsModule,
        NbAuthModule.forRoot(),
        ThemeModule.forRoot(),
        NgxChartsModule,
        // NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbEvaIconsModule,
        NbLayoutModule,
        NbListModule,
        NbStepperModule,
        NbCalendarModule,
        NbUserModule,
        NbSidebarModule.forRoot(),
        NbButtonModule,
        NbSelectModule,
        NbCardModule,
        NbDialogModule.forRoot(),
        NbMenuModule.forRoot(),
        NbWindowModule.forRoot(),
        NbInputModule,
        NbRadioModule,
        NbToggleModule,
        NbPopoverModule,
        NbCheckboxModule,
        NbDatepickerModule.forRoot(),
        NbDateFnsDateModule,
        NbToastrModule.forRoot(),
        D3Module,
        CommonModule,
        DemoMaterialModule,
        jqxSchedulerModule,
        NbTooltipModule,
        NbProgressBarModule
    ],
    providers: [
        AuthService,
        AuthGuardLogin,
        AuthGuardAdmin,
        UserService,
        PactService,
        DataSharingService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})

export class AppModule {
}

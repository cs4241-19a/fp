// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Services
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
// Components
import {AboutComponent} from './about/about.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AccountComponent} from './account/account.component';
import {AdminComponent} from './admin/admin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PactComponent} from './pact/pact.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthComponent} from './auth/auth.component';
import {LogsComponent} from './logs/logs.component';
import {CalendarComponent} from './calendar/calendar.component';
import {ProfileComponent} from './profile/profile.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';
import {BoardComponent} from './board/board.component';
import {PactSettingsComponent} from './pact-settings/pact-settings.component';
import {ExerciseComponent} from './exercise/exercise.component';

const routes: Routes = [
    {
        path: 'auth', component: AuthComponent,
        children: [
            {path: 'register', component: RegisterComponent},
            {path: 'login', component: LoginComponent},
        ]
    },
    {path: 'privacy', component: PrivacyPolicyComponent},
    {path: 'terms', component: TermsOfServiceComponent},
    {path: '', redirectTo: '/dashboard/about', pathMatch: 'full'},
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardLogin],
        children: [
            {path: 'board', component: BoardComponent},
            {path: 'about', component: AboutComponent},
            {path: 'logs', component: LogsComponent},
            {path: 'exercise', component: ExerciseComponent},
            {path: 'logout', component: LogoutComponent},
            {path: 'pact', component: PactComponent},
            {path: 'pactsettings', component: PactSettingsComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'account', component: AccountComponent},
            {path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin]},
            {path: 'calendar', component: CalendarComponent},
            {path: 'notfound', component: NotFoundComponent},
            {path: '', redirectTo: 'about', pathMatch: 'full'},
            {path: '**', redirectTo: 'notfound'}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

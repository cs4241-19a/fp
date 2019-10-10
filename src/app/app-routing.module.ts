import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PriceCompareComponent } from './price-compare/price-compare.component';
import { FAQComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AccountComponent } from './account/account.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
import { ProcedureSelectionComponent } from './procedure-selection/procedure-selection.component';
import { DrgtableComponent } from './drgtable/drgtable.component';
import { MaintenancePageComponent } from "./maintenance-page/maintenance-page.component";
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UnauthGuard } from './auth/unauth.guard';
import { AuthComponent } from './auth/auth.component';
import { ResetPComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    {
      path: 'signin',
      component: SignInComponent,
      canActivate: [UnauthGuard]
    },
    {
      path: 'signup',
      component: SignUpComponent,
      canActivate: [UnauthGuard]
    },
    {
      path: 'confirm',
      component: ConfirmCodeComponent,
      canActivate: [UnauthGuard]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'resetPassword',
      component: ResetPComponent,
      canActivate: [UnauthGuard]
    },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'priceCompare', component: PriceCompareComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'account', component: AccountComponent},
  // { path: 'sign-up', component: SignUpComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'confirm', component: ConfirmCodeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'resetPassword', component: ResetPComponent},

  { path: 'procedureSelection', component: ProcedureSelectionComponent},
  { path: 'drgtable', component: DrgtableComponent},
  { path: 'oops', component: MaintenancePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PriceCompareComponent } from './price-compare/price-compare.component';
import { FAQComponent } from './faq/faq.component';
import { FilterPipe } from "./auth/country-code-select/filter.pipe";
import { AvatarComponent } from "./auth/profile/avatar/avatar.component";
import { AccountComponent } from './account/account.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { ProcedureSelectionComponent } from './procedure-selection/procedure-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrgtableComponent } from './drgtable/drgtable.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HospitalPopupComponent } from './hospital-popup/hospital-popup.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MaintenancePageComponent } from './maintenance-page/maintenance-page.component';
import { AuthService } from './auth/auth.service';
import { MaterialModule } from './material/material.module';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { LoaderComponent } from './loader/loader.component';
import { ResetPComponent } from './auth/reset-password/reset-password.component'
import { ProfileComponent } from './auth/profile/profile.component';
import { CountryCodeSelectComponent } from './auth/country-code-select/country-code-select.component';
import { AuthComponent } from './auth/auth.component';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterModalComponent } from './footer-modal/footer-modal.component';
import { BottomSheetComponentAsSnackBarComponent } from './bottom-sheet-component-as-snack-bar/bottom-sheet-component-as-snack-bar.component';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { FooterComponent } from './footer/footer.component';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PriceCompareComponent,
    FAQComponent,
    SignUpComponent,
    AccountComponent,
    ProcedureSelectionComponent,
    DrgtableComponent,
    HospitalPopupComponent,
    ContactUsComponent,
    MaintenancePageComponent,
    FooterModalComponent,
    SignInComponent,
    ConfirmCodeComponent,
    LoaderComponent,
    ResetPComponent,
    ProfileComponent,
    AuthComponent,
    CountryCodeSelectComponent,
    FilterPipe,
    AvatarComponent,
    BottomSheetComponentAsSnackBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwzRGaPm9KP5ZjKvNs5qhFs3p0wePaI4c'
    }),
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatPasswordStrengthModule,
    ParallaxModule,
    MatSlideToggleModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [BottomSheetComponentAsSnackBarComponent]
})
export class AppModule { }

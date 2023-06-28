import { NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';


import { AppComponent } from './app.component';
import { CadastroComponent } from './pages/cadastro/register-influencer/presentation/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoggedHomeComponent } from './pages/logged-home/presentation/logged-home.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { OccupationAreaComponent } from './pages/occupation-area/occupation-area.component';
import { LoginComponent } from './pages/login/presentation/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MoreInlfuencerComponent } from './pages/home/more-inlfuencer/more-inlfuencer.component';
import { MoreEnterpriseComponent } from './pages/home/more-enterprise/more-enterprise.component';
import { MoreCatchuComponent } from './pages/home/more-catchu/more-catchu.component';
import { RegisterEmpresaComponent } from './pages/cadastro/register-empresa/presentation/register-empresa.component';
import { ChooseProfileComponent } from './pages/cadastro/choose-profile/choose-profile.component';
import { NavbarLoggedComponent } from './shared/components/navbar-logged/navbar-logged.component';
import { NavbarHomeComponent } from './shared/components/navbar-home/navbar-home.component';
import { NavbarLoginComponent } from './shared/components/navbar-login/navbar-login.component';
import { BackgroundMovementComponent } from './shared/components/background-movement/background-movement.component';
import { ProfileConfigComponent } from './pages/profile-config/presentation/profile-config.component';
import { ProposalComponent } from './pages/proposal/list/presentation/proposal.component';

import { NgxMaskModule } from 'ngx-mask';
import { AuthGuard } from './shared/utils/auth.guard';
import { ProposalFormComponent } from './pages/proposal/form/presentation/proposal-form.component';

import { LoadingComponent } from './shared/components/loading/loading.component';
// import { FormDialogComponent } from './pages/proposal/form/presentation/proposal-form.component';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProfileComponent } from './pages/profile/profile.component';
import { VisitProfileComponent } from './pages/visit-profile/visit-profile.component';
import { NewFormComponent } from './pages/proposal/newFrom/newForm.component';
import { ProposalEnviadasComponent } from './pages/proposal/list-enviadas/proposal-enviadas.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    LoggedHomeComponent,
    ForgotPasswordComponent,
    OccupationAreaComponent,
    MoreInlfuencerComponent,
    MoreEnterpriseComponent,
    MoreCatchuComponent,
    RegisterEmpresaComponent,
    NavbarLoggedComponent,
    NavbarHomeComponent,
    NavbarLoginComponent,
    ChooseProfileComponent,
    BackgroundMovementComponent,
    ProfileConfigComponent,
    ProposalComponent,
    ProposalFormComponent,
    // FormDialogComponent,
    ProposalEnviadasComponent,
    LoadingComponent,
    ProfileComponent,
    VisitProfileComponent,
    NewFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    NgxFileDropModule,
    MatBadgeModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

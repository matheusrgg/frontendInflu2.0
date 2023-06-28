import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CadastroComponent } from './pages/cadastro/register-influencer/presentation/cadastro.component'
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/presentation/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

import { OccupationAreaComponent } from './pages/occupation-area/occupation-area.component';
import { LoggedHomeComponent } from './pages/logged-home/presentation/logged-home.component';
import { MoreInlfuencerComponent } from './pages/home/more-inlfuencer/more-inlfuencer.component';
import { MoreEnterpriseComponent } from './pages/home/more-enterprise/more-enterprise.component';
import { MoreCatchuComponent } from './pages/home/more-catchu/more-catchu.component';
import { RegisterEmpresaComponent } from './pages/cadastro/register-empresa/presentation/register-empresa.component';
import { ChooseProfileComponent } from './pages/cadastro/choose-profile/choose-profile.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ProfileConfigComponent } from './pages/profile-config/presentation/profile-config.component';
import { ProposalComponent } from './pages/proposal/list/presentation/proposal.component';
import { ProposalFormComponent } from './pages/proposal/form/presentation/proposal-form.component';
import { ProposalEnviadasComponent } from './pages/proposal/list-enviadas/proposal-enviadas.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VisitProfileComponent } from './pages/visit-profile/visit-profile.component';
import { NewFormComponent } from './pages/proposal/newFrom/presentation/newForm.component';





const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CadastroComponent },
  { path: 'register-influencer', component: CadastroComponent },
  { path: 'register-empresa', component: RegisterEmpresaComponent },
  { path: 'choose-profile', component: ChooseProfileComponent },
  { path: 'logged-home', component: LoggedHomeComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'occupation-area', component: OccupationAreaComponent, canActivate: [AuthGuard] },
  { path: 'more-influencer', component: MoreInlfuencerComponent },
  { path: 'more-enterprise', component: MoreEnterpriseComponent },
  { path: 'more-catchu', component: MoreCatchuComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile-config', component: ProfileConfigComponent, canActivate: [AuthGuard] },
  { path: 'proposal', component: ProposalComponent, canActivate: [AuthGuard] },
  { path: 'proposalForm', component: ProposalFormComponent, canActivate: [AuthGuard] },
  { path: 'proposalForm/:id', component: ProposalFormComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'proposalFormId/:name', component: ProposalFormComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'proposalEnviadas', component: ProposalEnviadasComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'visit-profile/:id', component: VisitProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'visit-profile/:name', component: VisitProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'newForm', component: NewFormComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Enterprise, Influencer } from '../interfaces/influencer.interface';
import { Router } from '@angular/router';
import { LoginService } from '../../login/service/login.service';
import { IUser } from '../../login/interfaces/user1.interface';
import jwt_decode from 'jwt-decode';
import { liatAllEnterpriseInfluencerService } from 'src/app/shared/services/requests/listAllEnterpriseInfleuncers.service';

@Component({
  selector: 'app-logged-home',
  templateUrl: './logged-home.component.html',
  styleUrls: ['./logged-home.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class LoggedHomeComponent implements OnInit {
  userDisplayName: string | null = '';
  influencers!: Influencer[];
  enterprises!: Enterprise[];
  user!: IUser;
  userType: string = '';

  constructor(

    private router: Router,
    private loginService: LoginService,
    private listAll: liatAllEnterpriseInfluencerService
  ) { }

  ngOnInit(): void {
    this.userType = this.loginService.currentUser.perfil;
    this.getDecodeAccessToken();
    this.userDisplayName = this.getDecodeAccessToken();
    this.listAll.listAllInfluencers().subscribe(datas => (this.influencers = datas));
    this.listAll.listAllEnterprises().subscribe(datas => (this.enterprises = datas));
    this.getUser();

  }



  logout() {
    this.removeToken();
    this.router.navigate(['login']);
  }

  getUser() {
    this.user = this.loginService.currentUser;
    // return JSON.stringify(this.user)
  }

  public getToken(): string | null {
    return this.loginService.getToken();
  }

  public removeToken(): void {
    this.loginService.removeToken();
  }

  public isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  getDecodeAccessToken(): any {
    try {
      const token = JSON.stringify(sessionStorage.getItem('authToken'));
      const tokendecodificado: any = jwt_decode(token);
      return tokendecodificado.email;
    } catch (Error) {
      return null;
    }
  }

  clickNovaProposta(nome: any) {
    this.router.navigate(["/proposalFormId/" + nome])
  }

  clickLookProfile(nome: any) {
    this.router.navigate(['/visit-profile/' + nome])
  }
}

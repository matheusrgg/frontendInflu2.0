import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userName: string = '';
  userInstagram: string = '';
  userDescription: string = '';
  userInfo: any;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.userInfo = this.loginService.currentUser;

    this.userName = this.userInfo.nome;
    this.userInstagram = this.userInfo.instagram;
    this.userDescription = this.userInfo.descricao;
    console.log(this.userInfo);
    console.log(this.userName);
    console.log(this.userInstagram);
  }

}

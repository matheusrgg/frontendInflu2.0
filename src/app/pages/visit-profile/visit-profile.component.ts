import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProposalFormService } from '../proposal/form/service/proposal-form.service';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.scss']
})
export class VisitProfileComponent implements OnInit {

  userId: any;
  userName: string = '';
  userDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      this.userId = params.get('id');
      console.log(this.userId)
      this.getUserDetails();
    });
  }

  getUserDetails(): void {
    this.loginService.getUserById(this.userId).subscribe(
      (user) => {
        this.userName = user.name;
        this.userDescription = user.description;
        // Outras informações do usuário disponíveis na resposta da API
      },
      (error) => {
        console.error(error);
      }
    );
  }
}



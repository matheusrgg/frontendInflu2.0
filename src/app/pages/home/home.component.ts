import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  goToMoreInfluencer() {
    this.router.navigate(["/more-influencer"])
  }

  goToMoreEnterprise() {
    this.router.navigate(["/more-enterprise"])
  }

  goToMoreCatchu() {
    this.router.navigate(["/more-catchu"])
  }

}

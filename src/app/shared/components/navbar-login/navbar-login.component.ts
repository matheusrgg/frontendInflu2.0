import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.scss'],
})
export class NavbarLoginComponent {

  constructor(private router: Router) { }

  onClickLogo() {
    this.router.navigate(["/home"])
  }
}
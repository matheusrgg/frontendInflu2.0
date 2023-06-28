import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/service/login.service';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('visible <=> hidden', animate('150ms ease-in-out'))
    ])
  ]
})
export class NavbarLoggedComponent {
  showDropdownMenu = false;
  showToggleMenu = true;

  menuOpen = false;



  constructor(private router: Router, private loginService: LoginService) { }

  // toggleMenu() {
  //   const menuBtn = document.querySelector('.menu-btn');
  //   const menuContent = <HTMLElement>document.querySelector('.menu-content');

  //   // Verifica se o menu está aberto ou fechado
  //   if (menuContent.classList.contains('menu-content--open')) {
  //     // Se estiver aberto, fecha o menu
  //     menuContent.classList.remove('menu-content--open');
  //     menuContent.classList.add('menu-content--close');
  //   } else {
  //     // Se estiver fechado, abre o menu
  //     menuContent.classList.remove('menu-content--close');
  //     menuContent.classList.add('menu-content--open');
  //   }
  // }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onClickMenu() {
    if (!this.menuOpen) {
      this.menuOpen = true;
    }
  }

  toggleDropdownMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  closeDropdownMenu() {
    if (this.showDropdownMenu) {
      this.showDropdownMenu = false;
    }
  }

  onClickLogo() {
    this.router.navigate(['logged-home'])
  }

  onClickProposalToggle() {
    if (this.menuOpen) {
      this.router.navigate(['proposal'])
    }
  }

  onClickProposal() {
    this.router.navigate(['proposal'])
  }

  profileConfiguration() {
    this.router.navigate(['profile-config']);
  }

  profile() {
    this.router.navigate(['profile']);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['login']);
  }

  public removeToken(): void {
    this.loginService.removeToken();
  }
}

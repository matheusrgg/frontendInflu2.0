import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/login/service/login.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss'],
})
export class NavbarHomeComponent implements OnInit {
  public isMobileLayout = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWindowSize();
    this.closeMobileMenu();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-menu');
    const menuBtn = this.elementRef.nativeElement.querySelector('.mobile-menu-btn');
    if (menuBtn && this.isMobileLayout && !menuBtn.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('mobile-menu');
    }
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.nav-bar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('active-scroll');
    } else {
      element.classList.remove('active-scroll');
    }
  }

  onClickHamburguer() {
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-menu');
    const menuBtn = this.elementRef.nativeElement.querySelector('.mobile-menu-btn');
    if (menuBtn && this.isMobileLayout) {
      navMenu.classList.toggle('mobile-menu');
    }
  }

  private checkWindowSize() {
    this.isMobileLayout = window.innerWidth <= 991;
  }

  closeMobileMenu() {
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-menu');
    if (navMenu && this.isMobileLayout) {
      navMenu.classList.remove('mobile-menu');
    }
  }

  goToLogin() {
    this.router.navigate(["/login"])
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

  goToHome() {
    this.router.navigate(["home"])
  }
}

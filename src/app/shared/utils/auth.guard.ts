import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = sessionStorage.getItem('authToken');
    if (isAuthenticated) {
    // this.router.navigate(['/logged-home']);
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
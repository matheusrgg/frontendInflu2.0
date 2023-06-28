import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Login } from '../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userUnauthorized: boolean = false
  userNotValid: boolean = true
  fieldTextType: boolean = false;
  showPasswordStatus: string = "visibility_off";
  private isLoggedIn = false;
  decodedToken: any;
  selectedRole: string = "influencer";

  constructor(
    private router: Router,
    private loginService: LoginService

  ) { }

  ngOnInit(): void { }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    radio: new FormControl("influencer", Validators.required),
  })

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    if (this.fieldTextType == true) {
      this.showPasswordStatus = "visibility"
    }
    else {
      this.showPasswordStatus = "visibility_off"
    }
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    let user = this.loginForm.value;
    this.onLogin({ email: user.email!, senha: user.password! });
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  onLogin({ email, senha }: Login) {
    if (this.selectedRole === 'influencer') {
      this.loginService.saveUser({ email, senha })
        .subscribe({
          next: (res) => {
          
            this.isLoggedIn = true
          
            this.loginService.setToken(res);
            this.router.navigate(["logged-home"])
          },
          error: (err) => {
    
            if (err = 401) {
              this.userUnauthorized = true
            }
          }
        }
        )
    } else if (this.selectedRole === 'company') {
      this.loginService.saveUserEnterprise({ email, senha })
        .subscribe({
          next: (res) => {
     
            this.isLoggedIn = true
    
            this.loginService.setToken(res);
            this.router.navigate(["logged-home"])
          },
          error: (err) => {
   
            if (err = 401) {
              this.userUnauthorized = true
            }
          }
        }
        )
    }
  }

  onClickLogo() {
    this.router.navigate(['home'])
  }

  onRoleChange(event: any) {
    if (event.target.checked) {
      this.selectedRole = event.target.value;
    
    }
  }

}
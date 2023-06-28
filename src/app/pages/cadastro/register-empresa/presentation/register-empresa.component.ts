import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import CustomValidators from './form-validators';
import { Router } from '@angular/router';
// import { CadastroService } from '../service/cadastro.service';
import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { RegisterEmpresaService } from '../service/register-empresa.service';
import { ValidadorCpfCnpjService } from 'src/app/shared/services/validadorCpfCnpj.service';



@Component({
  selector: 'app-home',
  templateUrl: './register-empresa.component.html',
  styleUrls: ['./register-empresa.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class RegisterEmpresaComponent implements OnInit {

  fieldTextType: boolean = false;
  fieldTextTypeConfirm: boolean = false;
  showPasswordStatus: string = "visibility_off";
  showPasswordStatusConfirm: string = "visibility_off";
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerEmpresaService: RegisterEmpresaService,
    private validadorCpfCnpjService: ValidadorCpfCnpjService
  ) { }
  ngOnInit() {
    this.initRegisterForm();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    if (this.fieldTextType == true) {
      this.showPasswordStatus = "visibility"
    }
    else {
      this.showPasswordStatus = "visibility_off"
    }
  }

  toggleFieldTextTypeConfirm() {
    this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
    if (this.fieldTextTypeConfirm == true) {
      this.showPasswordStatusConfirm = "visibility"
    }
    else {
      this.showPasswordStatusConfirm = "visibility_off"
    }
  }




  initRegisterForm() {
    this.registrationForm = this.fb.group({
      name: new FormControl("", Validators.compose([Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),

      document: new FormControl('', [Validators.required,]),
      profileType: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    },
      {
        validators: [CustomValidators.match('password', 'confirmPassword')]
      })
  }

  onSubmit() {
    let user = this.registrationForm.value;
    this.onCreateEmpresa(user.name, user.email, user.password, user.document, 'esporte')
  }


  onCreateEmpresa(name: any, email: any, senha: any, cpf: any, tags: any) {

    this.registerEmpresaService.createEmpresa(name, email, senha, cpf, tags)
      .subscribe({
        next: (res: any) => {
       
          this.router.navigate(["login"])
        },
        error: (err: any) => {
          return err

        }
      }

      )


  }

  cnpjValidator(control: FormControl) {
    const cnpj = control.value;

    // Remove pontos, traços e barras do CNPJ
    const cnpjCleaned = cnpj.replace(/[^\d]+/g, '');

    // Verifica se o CNPJ tem 14 dígitos e não é uma sequência de números repetidos
    if (cnpjCleaned.length === 14 && !/^(\d)\1+$/.test(cnpjCleaned)) {
      // Aplica o algoritmo de validação do CNPJ
      let sum = 0;
      let weight = 2;

      for (let i = 11; i >= 0; i--) {
        sum += parseInt(cnpjCleaned.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
      }

      const rest = sum % 11;

      if (rest < 2 && parseInt(cnpjCleaned.charAt(12)) !== 0) {
        return { cnpjInvalido: true };
      } else if (rest >= 2 && 11 - rest !== parseInt(cnpjCleaned.charAt(12))) {
        return { cnpjInvalido: true };
      }

      sum = 0;
      weight = 2;

      for (let i = 12; i >= 0; i--) {
        sum += parseInt(cnpjCleaned.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
      }

      const rest2 = sum % 11;

      if (rest2 < 2 && parseInt(cnpjCleaned.charAt(13)) !== 0) {
        return { cnpjInvalido: true };
      } else if (rest2 >= 2 && 11 - rest2 !== parseInt(cnpjCleaned.charAt(13))) {
        return { cnpjInvalido: true };
      }

      return null; // CNPJ válido
    } else {
      return { cnpjInvalido: true }; // CNPJ inválido
    }
  }



}




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
import { CadastroService } from '../service/cadastro.service';
import { FormControl } from '@angular/forms';
import { Influencer } from '../interfaces/influencer.interface';
import { finalize } from 'rxjs/operators'
@Component({
  selector: 'app-home',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class CadastroComponent implements OnInit {

  fieldTextType: boolean = false;
  fieldTextTypeConfirm: boolean = false;
  showPasswordStatus: string = "visibility_off";
  showPasswordStatusConfirm: string = "visibility_off";
  registrationForm!: FormGroup;

  apiErrorMessage: string = '';
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadastroService: CadastroService
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
      birthDate: ["", Validators.required],
      document: new FormControl('', [Validators.required, this.cpfValidator]),
      // profileType: ["", Validators.required],
      password: ["", Validators.required],
      instagram: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    },
      {
        validators: [CustomValidators.match('password', 'confirmPassword')]
      })
  }

  onSubmit() {
    this.loading = true
    let user = this.registrationForm.value;
    this.onCreateInfluencer(
      {
        nome: user.name,
        email: user.email,
        senha: user.password,
        cpf: user.document,
        instagram: user.instagram,
        tags: 'esporte',
        data_nascimento: user.birthDate
      })

  }

  onCreateInfluencer({ nome, email, senha, cpf, tags, instagram, data_nascimento }: Influencer) {

    this.cadastroService.createInfluencer(nome, email, senha, cpf, tags, instagram, data_nascimento)
      .pipe(finalize(() => { this.loading = false }))
      .subscribe({
        next: (res: any) => {


          this.router.navigate(["login"])

        },
        error: (err: any) => {

          if (err.status == 500) {
            this.registrationForm.controls['email'].setErrors({ invalid: true })
          }
          this.apiErrorMessage = err.error
        },

      }
      )
  }

  cpfValidator(control: FormControl) {
    const cpf = control.value


    // Remove pontos e traços do CPF
    const cpfCleaned = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos e não é uma sequência de números repetidos
    if (cpfCleaned.length === 11 && !/^(\d)\1+$/.test(cpfCleaned)) {
      // Aplica o algoritmo de validação do CPF
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpfCleaned.charAt(i)) * (10 - i);
      }

      let rest = 11 - (sum % 11);
      if (rest === 10 || rest === 11) {
        rest = 0;
      }

      if (rest !== parseInt(cpfCleaned.charAt(9))) {
        return { cpfInvalido: true };
      }

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpfCleaned.charAt(i)) * (11 - i);
      }

      rest = 11 - (sum % 11);
      if (rest === 10 || rest === 11) {
        rest = 0;
      }

      if (rest !== parseInt(cpfCleaned.charAt(10))) {
        return { cpfInvalido: true };
      }

      return null; // CPF válido
    } else {
      return { cpfInvalido: true }; // CPF inválido
    }
  }


}




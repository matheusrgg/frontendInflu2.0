import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login/service/login.service';
import { Router } from '@angular/router';
import { ProfileConfigService } from '../service/profile-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UploadResponse {
  uploadedFilePath: string;
}

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent {

  userId: number = 0;
  userType: string = '';
  userName: string = '';
  userEmail: string = '';
  userCpf: string = '';
  userCnpj: string = '';
  userDescription: string = '';
  userInfo: any;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loginService: LoginService,
    private profileConfigService: ProfileConfigService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }


  ngOnInit(): void {
    this.userInfo = this.loginService.currentUser;
    this.userType = this.userInfo.perfil;
    this.userId = this.userInfo.id;
    this.userName = this.userInfo.nome;
    this.userEmail = this.userInfo.email;
    this.userCpf = this.userInfo.cpf;
    this.userCnpj = this.userInfo.cnpj;
    this.userDescription = this.userInfo.descricao;

    // Preenche os campos do formulário com as informações do usuário
    this.form.patchValue({
      name: this.userName,
      email: this.userEmail,
      description: this.userDescription
    });
  }
  form = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    description: new FormControl(""),
    cpf: new FormControl({ value: "", disabled: true }),
    cnpj: new FormControl({ value: "", disabled: true }),
  })

  onClickBack() {
    this.router.navigate(["/logged-home"])
  }

  onClickEdit(): void {
    if (this.userType == "influenciador") {
      this.profileConfigService.updateUser(this.form.value.name, this.form.value.email, this.form.value.description).subscribe(() => {

        // Exibe mensagem de sucesso
        this.snackBar.open('Informações atualizadas com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }, error => {
        console.error('Erro ao atualizar informações do usuário', error);

        // Exibe mensagem de erro
        this.snackBar.open('Erro ao atualizar informações do usuário. Tente novamente mais tarde.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      });
    } else if (this.userType == "empreendedor") {
      this.profileConfigService.updateUserEmpresa(this.form.value.name, this.form.value.email, this.form.value.description).subscribe(() => {

        // Exibe mensagem de sucesso
        this.snackBar.open('Informações atualizadas com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }, error => {
        console.error('Erro ao atualizar informações do usuário', error);

        // Exibe mensagem de erro
        this.snackBar.open('Erro ao atualizar informações do usuário. Tente novamente mais tarde.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      });
    }
  }

  onClickEditArea() {
    this.router.navigate(["/occupation-area"])
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/service/login.service';
import { environment } from 'src/environments/environment.development';
import { take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileConfigService {
    private apiUrl: string;
    private apiUrlEmpresa: string;

    constructor(private http: HttpClient, private loginService: LoginService) {
        this.apiUrl = environment.APIUPDATEINFLUENCER;
        this.apiUrlEmpresa = environment.APIUPDATEEMPRESA;
    }

    updateUser(nome: any, email: any, descricao: any) {
        const body = { nome, email, descricao };
        return this.http.put(`${this.apiUrl}/${this.loginService.currentUser.id}`, body).pipe(take(1));
    }

    updateUserEmpresa(nome: any, email: any, descricao: any) {
        const body = { nome, email, descricao };
        return this.http.put(`${this.apiUrlEmpresa}/${this.loginService.currentUser.id}`, body).pipe(take(1));
    }
}

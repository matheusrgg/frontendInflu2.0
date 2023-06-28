import { Injectable } from "@angular/core";
import { catchError, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment.development";
@Injectable({
    providedIn: 'root'
})
export class CadastroService {
    constructor(
        public http: HttpClient
    ) {
    }
    public createInfluencer(name: any, email: any, senha: any, cpf: any, tags: any, instagram:any,  data_nascimento: any) {
        const url = environment.APICREATEINFLUENCER;

        return this.http.post<any>(url, {
            nome: name,
            email: email,
            senha: senha,
            cpf: cpf,
            tags: tags,
            instagram:instagram,
            data_nascimento: data_nascimento
        })
    }
} 
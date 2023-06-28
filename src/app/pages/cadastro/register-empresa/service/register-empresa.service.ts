import { Injectable } from "@angular/core";
import { catchError, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment.development";
@Injectable({
    providedIn: 'root'
})
export class RegisterEmpresaService {
    constructor(

        public http: HttpClient
    ) {

    }



    public createEmpresa(name : any, email: any, senha: any, cpf: any, tags: any) {
        const url = environment.APICREATEEMPRESA;
        return this.http.post<any>(url, {
            nome:name,
            email: email,
            senha: senha,
            cnpj: cpf,
            tags: tags,

        })

    }


} 
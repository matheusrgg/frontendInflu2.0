import { Injectable } from "@angular/core";
import { catchError, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment.development";
import { ProposalInterface } from "../proposal-interface";
@Injectable({
    providedIn: 'root'
})
export class ProposalFormService {

    constructor(
        public http: HttpClient
    ) {


    }
 

 




    getEmpresaName(name: any) {
        const api = this.http.get<any>(`${environment.APIIDBYNAMEEMPRESA}/${name}`);
        return api
    }




}
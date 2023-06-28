
import { ProposalInterface } from "src/app/pages/proposal/form/proposal-interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment.development";
import { Enterprise, Influencer } from "src/app/pages/logged-home/interfaces/influencer.interface";
import { LoginService } from "src/app/pages/login/service/login.service";

@Injectable({
    providedIn: 'root'
})

export class listRecebidasEnviadasService { 

    constructor(
        public http: HttpClient,
        private loginService: LoginService,
        ) { }

    listAllProposalsRecebidas() {
        const api = this.http.get<any[]>(`${environment.APILISTPROPOSALINFLURECEBS}/${this.loginService.currentUser.id}`);  
        console.log("o que ta vindo??", api)
        return api
    }

    // listEmpresaByName(id:any){
    //     const api = this.http.get<any[]>(`${environment.APILISTAEMPRESA}/${id}`);  
    //     return api
    // }

    // listAllProposalsEmpresasRecebidas() {
    //     console.log(this.loginService.currentUser.id);
    //     const api = this.http.get<any[]>(`${environment.APILISTPROPOSALEMPRERECEBS}/${this.loginService.currentUser.id}`);   
    //     return api
    // }


    listAllProposals() {
        const api = this.http.get<any[]>(`${environment.APILISTPROPOSALINFLUENVIO}/${this.loginService.currentUser.id}`);   
        return api
    }


   
}
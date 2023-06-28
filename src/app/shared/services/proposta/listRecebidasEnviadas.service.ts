
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

    listAllProposalsRecebidasInfluenciador() {
        const api = this.http.get<any[]>(`${environment.APILISTPROPOSALINFLURECEBS}/${this.loginService.currentUser.id}`);  
        return api
    }

    listAllProposalsEnviadasInfluenciador() {
        const api = this.http.get<any[]>(`${environment.APILISTPROPOSALINFLUENVIO}/${this.loginService.currentUser.id}`);   
        return api
    }

    listAllProposalsRecebidasEmpresa() {
        const api = this.http.get<any[]>(`${environment.APILISTPROPOSALEMPRERECEBS}/${this.loginService.currentUser.id}`);  
        return api
    }

    listAllProposalsEnviadasEmpresa() {
        const api = this.http.get<any[]>(`${environment.APILISTPROPOSALEMPREENVIO}/${this.loginService.currentUser.id}`);   
        return api
    }


   
}
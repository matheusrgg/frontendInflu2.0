
import { ProposalInterface } from "src/app/pages/proposal/form/proposal-interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment.development";
import { Enterprise, Influencer } from "src/app/pages/logged-home/interfaces/influencer.interface";

@Injectable({
    providedIn: 'root'
})

export class EmpresaService { 

    constructor(public http: HttpClient) { }

    listAllEnterprises() {
        return this.http.get<Enterprise[]>(environment.APILISTAEMPRESA);
    }


   
}
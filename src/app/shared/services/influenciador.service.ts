
import { ProposalInterface } from "src/app/pages/proposal/form/proposal-interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment.development";
import { Enterprise, Influencer } from "src/app/pages/logged-home/interfaces/influencer.interface";

@Injectable({
    providedIn: 'root'
})

export class InfluenciadorService { 

    constructor(public http: HttpClient) { }


    listAllInfluencers() {
        return this.http.get<Influencer[]>(environment.APILISTAINFLUENCER);
    }




    getInfluenciadorId(id: any) {
        return this.http.get<any>(`${environment.APILISTAINFLUENCER}/${id}`);

    }

   
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment.development";
import { Enterprise, Influencer } from "src/app/pages/logged-home/interfaces/influencer.interface";
import { ProposalInterface } from "src/app/pages/proposal/form/formResposta/proposal-interface";

@Injectable({
    providedIn: 'root'
})

export class PropostaService {

    constructor(public http: HttpClient) { }


    deleteProposal(id: any) {
        const api = this.http.delete<any>(`${environment.APIDELETE}/${id}`);
        return api
    }


    getIdProposal(id: any) {
        const api = this.http.get<any>(`${environment.APIEDITONEPROPOSAL}/${id}`);
        return api
    }


    public updateProposal(status_proposta: any, id: any, updated: boolean) {

        const api = this.http.put<any>(`${environment.APIEDITPROPOSAL}${id}`, {
            status_proposta: status_proposta,
            updated: 'true'
        })
        console.log("updateddd", api);
        return api
    }


    public createProposal(proposal: ProposalInterface) {
        const url = environment.APINEWPROPOSAL;

        return this.http.post<any>(url, {
            mensagem_proposta: proposal.mensagem_proposta,
            veiculo_midiatico: proposal.veiculo_midiatico,
            valor_divulgacao: proposal.valor_divulgacao,
            id_influenciador: proposal.id_influenciador,
            id_empresa: proposal.id_empresa,
            status_proposta: proposal.status_proposta,
            tipo_remetente: proposal.tipo_remetente,
            id_remetente: proposal.id_remetente,
            id_destinatario: proposal.id_destinatario,
            data_envio: proposal.data_envio,
            updated: proposal.updated
        })
    }


}
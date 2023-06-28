import { Injectable } from "@angular/core";
import { catchError, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment.development";
import { ProposalInterface } from "../proposal-interface";
@Injectable({
    providedIn: 'root'
})
export class ProposalFormService {

    private listOne: string
    constructor(
        public http: HttpClient
    ) {

        this.listOne = environment.APIEDITONEPROPOSAL
    }
    public createProposal(

        proposal: ProposalInterface

    ) {
        const url = environment.APINEWPROPOSAL;

        return this.http.post<any>(url, {
            mensagem_proposta: proposal.mensagem_proposta,
            veiculo_midiatico: proposal.veiculo_midiatico,
            valor_divulgacao: proposal.valor_divulgacao,
            influenciadorId: proposal.influenciadorId,
            empresaId: proposal.empresaId,
            status_proposta: proposal.status_proposta,
            tipo_remetente: proposal.tipo_remetente,
            id_remetente: proposal.id_remetente,
            id_destinatario: proposal.id_destinatario,
            data_envio: proposal.data_envio,
            updated:proposal.updated
        })
    }

    public updateProposal(
        status_proposta: any,
        id: any,
        updated:boolean
    ) {

       const api  = this.http.put<any>(`${environment.APIEDITPROPOSAL}${id}`, 
       {
        status_proposta: status_proposta, 
        updated:'true' 
    })
       console.log("updateddd", api);
       return api
    }


    getIdProposal(id: any) {
        const api = this.http.get<any>(`${this.listOne}/${id}`);
        return api
    }

    getEmpresaName(name: any) {
        const api = this.http.get<any>(`${environment.APIIDBYNAMEEMPRESA}/${name}`);
        return api
    }

    deleteProposal(id:any){
        const api = this.http.delete<any>(`${environment.APIDELETE}/${id}`);
        return api
    }


}
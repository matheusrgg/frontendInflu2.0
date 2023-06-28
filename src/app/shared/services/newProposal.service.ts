import { Injectable } from "@angular/core";
import { ProposalInterface } from "src/app/pages/proposal/form/proposal-interface";


@Injectable({
    providedIn: 'root'
})

export class NewProposalService { 

    functionCorpoObj(
        tipoRemetente: string, 
        mensagemProposta: string, 
        influenciadorId: string,
        empresaId: number, 
        id_remetente: number
    ): ProposalInterface {
        return {
            mensagem_proposta: mensagemProposta,
            veiculo_midiatico: 'instagram',
            valor_divulgacao: '',
            influenciadorId: influenciadorId,
            empresaId: empresaId,
            status_proposta: 'pendente',
            tipo_remetente: tipoRemetente,
            id_remetente: id_remetente,
            id_destinatario: "1",
            data_envio: new Date(),
            updated:false
        }
    }

   
}
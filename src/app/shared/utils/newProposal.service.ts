import { Injectable } from "@angular/core";
import { ProposalInterface } from "src/app/pages/proposal/form/proposal-interface";


@Injectable({
    providedIn: 'root'
})

export class NewProposalService { 

    functionCorpoObj(
        tipoRemetente: string, 
        mensagemProposta: string, 
        id_influenciador: number,
        id_empresa: number, 
        id_remetente: string,
        id_destinatario: string
    ): ProposalInterface {
        return {
            mensagem_proposta: mensagemProposta,
            veiculo_midiatico: 'instagram',
            valor_divulgacao: '',
            id_influenciador: id_influenciador,
            id_empresa: id_empresa,
            status_proposta: 'pendente',
            tipo_remetente: tipoRemetente,
            id_remetente: id_remetente,
            id_destinatario:id_destinatario,
            data_envio: new Date(),
            updated:false
        }
    }

   
}
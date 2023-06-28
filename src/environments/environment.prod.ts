
//variavaeis de ambiente local FRONT
export const environment = {
    // -----------INFLUENCER
    APILOGININFLUENCER: 'http://localhost:4030/influenciador/login',
    APICREATEINFLUENCER: 'http://localhost:4030/influenciador/create',
    APILISTAINFLUENCER: 'http://localhost:4030/influenciador/list',
    APIUPDATEINFLUENCER: 'http://localhost:4030/influenciador/update',
    
    // -----------EMPRESA
    APILOGININEMPRESA: 'http://localhost:4030/empresa/login',
    APICREATEEMPRESA: 'http://localhost:4030/empresa/create',
    APIUPDATEEMPRESA: 'http://localhost:4030/empresa/update',
    APILISTAEMPRESA: 'http://localhost:4030/empresa/list',


    // -----------EMPRESA -> Envio de Propostas
    APIIDBYNAMEEMPRESA: 'http://localhost:4030/empresa/listByName',
    

  
    // -----------Proposal
    APINEWPROPOSAL: 'http://localhost:4030/proposta/create',

    APIEDITPROPOSAL: 'http://localhost:4030/proposta/update/',
    APIEDITONEPROPOSAL: 'http://localhost:4030/proposta/listOne',
    APIDELETE: 'http://localhost:4030/proposta/delete',
    // -----------Proposal Influenciador - envio e recebimento
    APILISTPROPOSALINFLUENVIO: 'http://localhost:4030/proposta/listPropostaFromInfluencerEnviadas',
    APILISTPROPOSALINFLURECEBS:'http://localhost:4030/proposta/listPropostaFromInfluencerRecebidas',

    
    // -----------Proposal Empresa - envio e recebimento
    APILISTPROPOSALEMPREENVIO: 'http://localhost:4030/proposta/listPropostaFromEmpresaEnviadas',
    APILISTPROPOSALEMPRERECEBS:'http://localhost:4030/proposta/listPropostaFromEmpresaRecebidas'

   
};
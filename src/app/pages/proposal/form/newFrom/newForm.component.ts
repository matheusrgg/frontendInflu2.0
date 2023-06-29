import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ProposalInterface } from '../formResposta/proposal-interface';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { NewProposalService } from 'src/app/shared/utils/newProposal.service';
import { EmpresaService } from 'src/app/shared/services/empresa.service';
import { InfluenciadorService } from 'src/app/shared/services/influenciador.service';
import { PropostaService } from 'src/app/shared/services/proposta/proposta.service';
import { LoginService } from 'src/app/pages/login/service/login.service';
import { Enterprise, Influencer } from 'src/app/pages/logged-home/interfaces/influencer.interface';


@Component({
    selector: 'app-newForm',
    templateUrl: './newForm.component.html',
    styleUrls: ['./newForm.component.scss']
})
export class NewFormComponent implements OnInit {

    idDestinatario: any
    idRemetente: any
    mensagemProposta: string = ''
    userInfo: any;
    enterprises!: Enterprise[];
    influencers!: Influencer[];
    userType: string = '';
    
    constructor(
        private router: Router,
        private loadingService: LoadingService,
        private newProposalService: NewProposalService,
        private loginService: LoginService,
        private influenciadorService: InfluenciadorService,
        private empresaService: EmpresaService,
        private propostaService: PropostaService
    ) { }

    proposalForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    })


    ngOnInit(): void {
        this.userType = this.loginService.currentUser.perfil;
        this.empresaService.listAllEnterprises().subscribe(datas => (this.enterprises = datas));
        this.influenciadorService.listAllInfluencers().subscribe(datas => (this.influencers = datas));
    }

    onClickCancel() {
        this.router.navigate(["/proposal"])
    }

    click() {
        this.loadingService.loadingOn()
        this.userInfo = this.loginService.currentUser;
        this.idDestinatario = this.proposalForm.value.name
        this.idRemetente = this.userInfo.id
        this.mensagemProposta = JSON.stringify(this.proposalForm.value.description)

        if (this.userInfo.perfil === "empreendedor") {
            this.onCreateProposal(this.newProposalService.functionCorpoObj(
                'marca',
                this.mensagemProposta,
                this.idDestinatario,
                this.idRemetente,
                this.idRemetente,
                this.idDestinatario,


            ))
        } else {
            this.onCreateProposal(
                this.newProposalService.functionCorpoObj(
                    'influenciador',
                    this.mensagemProposta,
                    this.idRemetente,
                    this.idDestinatario,
                    this.idRemetente,
                    this.idDestinatario,

                )

            )}

    }

    onCreateProposal(obj: ProposalInterface) {
        this.propostaService.createProposal(obj)
            .subscribe({
                next: (res: any) => {
                    this.loadingService.loadingOff()
                    this.router.navigate(["proposal"])
                },
                error: (err: any) => {
                    console.log(err.status);
                    console.log(err.erro)
                }
            })
    }

}


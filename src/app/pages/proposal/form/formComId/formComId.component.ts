import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { LoginService } from '../../../login/service/login.service';
import { PropostaService } from 'src/app/shared/services/proposta/proposta.service';
import { NewProposalService } from 'src/app/shared/utils/newProposal.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/shared/services/empresa.service';
import { InfluenciadorService } from 'src/app/shared/services/influenciador.service';
import { ProposalInterface } from '../formResposta/proposal-interface';


interface Media {
    value: string;
    viewValue: string;
}


@Component({
    selector: 'app-formComId-comid',
    templateUrl: './formComId.component.html',
    styleUrls: ['./formComId.component.scss']
})
export class ProposalFormComIdComponent implements OnInit {
    
    userInfo: any;
    idEmpresa: any
    idDestinatario: any
    idRemetente: any
    mensagemProposta: string = ''
    userType: string = '';
    nomeEmpresa: any
    enterpriseCtrl = new FormControl('');
    remetenteName: string = "";
    receivedProposal: string = "";
    influencerCtrl = new FormControl('');
    proposal: any = []
    id: any;
    bussinessMan: any
    updatedStatus: string = "false"
    statusPropostaBody: string = ""
    nomeInfluenciador:any


    constructor(
        private router: Router,
        private loginService: LoginService,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private newProposalService: NewProposalService,
        private propostaService: PropostaService,
        private empresaService: EmpresaService,
        private influenciadorService:InfluenciadorService
    ) { }

    proposalForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    })


    ngOnInit(): void {
        this.userInfo = this.loginService.currentUser;
        this.carregarIdRota();
    }

    clickWithName() {
        this.loadingService.loadingOn()
   
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

            )
        }
    }


    onCreateProposal(obj: ProposalInterface) {
        this.propostaService.createProposal(
            obj
        )
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
    onClickCancel() {
        this.router.navigate(["/proposal"])
    }


    carregarIdRota() {
        this.route.paramMap.subscribe((params: any) => {
            this.id = params.get('id')
           if(this.userInfo.perfil === "empreendedor"){
               this.loadIdEmpresa(this.id)
           }else{
            this.loadIdInfluenciador(this.id)
           }
        });

    }

    loadIdInfluenciador(id: any){
        this.influenciadorService.getInfluenciadorId(id).subscribe((data)=>{
            this.idEmpresa = data.id
            this.nomeInfluenciador =data.nome
            this.proposalForm.controls['name'].setValue(this.nomeInfluenciador)
            this.proposalForm.controls['name'].disable();
        })
    }

    loadIdEmpresa(id: any) {
        this.empresaService.getEmpresaId(id).subscribe((data) => {
            this.idEmpresa = data.id
            this.nomeEmpresa = data.nome
            this.proposalForm.controls['name'].setValue(this.nomeEmpresa)
            this.proposalForm.controls['name'].disable();
        })
    }



}


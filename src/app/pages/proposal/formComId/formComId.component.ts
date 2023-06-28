import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { LoginService } from '../../login/service/login.service';
import { PropostaService } from 'src/app/shared/services/proposta/proposta.service';
import { NewProposalService } from 'src/app/shared/utils/newProposal.service';
import { ProposalInterface } from '../form/proposal-interface';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/shared/services/empresa.service';


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


    dropdown = [{
        id: 1,
        viewValue: 'empresa'
    }, {

        id: 1,
        viewValue: 'empresa'

    }
    ]
    enterpriseCtrl = new FormControl('');


    remetenteName: string = "";
    receivedProposal: string = "";

    influencerCtrl = new FormControl('');

   

    media: Media[] = [
        { value: 'instagram-0', viewValue: 'Instagram' },

    ];

    proposal: any = []

    id: any;
    bussinessMan: any
    updatedStatus:string = "false"
    statusPropostaBody:string = ""
    constructor(
        private router: Router,
        private loginService: LoginService,
        // private proposalFormService: ProposalFormService,
        private route: ActivatedRoute,
        // private utilsService: UtilsService,
        private loadingService: LoadingService,
        private newProposalService: NewProposalService,
        private propostaService: PropostaService,
        private empresaService: EmpresaService
    ) { }

    proposalForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    })


    ngOnInit(): void {

        this.route.paramMap.subscribe((params: any) => {
            console.log(params);
            this.loadIdEmpresa(params.get('name'))
            this.bussinessMan = params.get('name')
            console.log("teste agora vai ID", this.bussinessMan)
        });
        this.route.paramMap.subscribe((params: any) => {
            console.log(params);
            this.id = params.get('id')
            
        });

        if (this.bussinessMan) {
            console.log("ok ta indo")
            this.userType = 'newProposalId'
            console.log("pq nao foi oo form certo", this.userType);
            this.proposalForm.controls['name'].setValue(this.bussinessMan)
            this.proposalForm.controls['name'].disable();
        } else if (this.id) {
            this.userType = 'responderProposta'
            this.getIdProposal(this.id)
            this.proposalForm.controls['name'].disable();
            this.proposalForm.controls['description'].disable();
            console.log("ta vazio neh", this.proposal);
        }
        else {
            this.userType = 'novaProposta'
        }
    }

    clickWithName() {
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

    getIdProposal(id: any) {
        this.propostaService.getIdProposal(id).subscribe((data) => {
            this.proposalForm.patchValue({
                name: data.id_destinatario,
                description: data.mensagem_proposta
            })
            this.remetenteName = data.id_destinatario;
            this.receivedProposal = data.mensagem_proposta;
            this.updatedStatus = data.updated
            this.statusPropostaBody = data.status_proposta
            console.log("teste Updated Proposta???", this.updatedStatus);
        })
    }


    
    loadIdEmpresa(name: any) {
        this.empresaService.getEmpresaName(name).subscribe((data) => {
            this.idEmpresa = data.id
        })
    }

    

}


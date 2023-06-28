import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { Enterprise, Influencer } from '../../../logged-home/interfaces/influencer.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../../../login/service/login.service';
import { ProposalFormService } from '../service/proposal-form.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ProposalInterface } from '../proposal-interface';
import { NewProposalService } from 'src/app/shared/utils/newProposal.service';
import { PropostaService } from 'src/app/shared/services/proposta/proposta.service';


interface Media {
    value: string;
    viewValue: string;
}


@Component({
    selector: 'app-proposal-form',
    templateUrl: './proposal-form.component.html',
    styleUrls: ['./proposal-form.component.scss']
})
export class ProposalFormComponent implements OnInit {
    userType: string = '';
    userInfo: any;

    dropdown = [{
        id: 1,
        viewValue: 'empresa'
    }, {

        id: 1,
        viewValue: 'empresa'

    }
    ]
    enterpriseCtrl = new FormControl('');
    enterprises: Enterprise[] = [];
    filteredEnterprises!: Observable<Enterprise[]>;

    remetenteName: string = "";
    receivedProposal: string = "";

    influencerCtrl = new FormControl('');
    influencers: Influencer[] = [];
    filteredInfluencers!: Observable<Influencer[]>;
    idEmpresa: any

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
        private proposalFormService: ProposalFormService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
        private loadingService: LoadingService,
        private newProposalService: NewProposalService,
        private propostaService: PropostaService
    ) { }

    proposalForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    })


    ngOnInit(): void {

        this.route.paramMap.subscribe((params: ParamMap) => {
            console.log(params);
            this.loadIdEmpresa(params.get('name'))
            this.bussinessMan = params.get('name')
            console.log("teste agora vai ID", this.bussinessMan)
        });
        this.route.paramMap.subscribe((params: ParamMap) => {
            console.log(params);
            this.id = params.get('id')
        });

        if (this.bussinessMan) {
            console.log("ok ta indo")
            this.userType = 'newProposalId'
            console.log("pq nao foi oo form certo", this.userType);
            this.proposalForm.controls['name'].setValue(this.bussinessMan)
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

    statusProposta(status: string) {
        this.userInfo = this.loginService.currentUser;
        console.log("de quem é", this.userInfo.id);
        if(this.updatedStatus == 'true'){
            alert("Essa proposta já foi Aceita ou Recusada")
        }else{
            this.propostaService.getIdProposal(this.id).subscribe((data) => {
                this.updateProposta({
                    status_proposta: status,
                    id: this.id,
                    updated: 'true'
                })
                this.utilsService.setProposta(status);
            })
            this.router.navigate(["proposal"])
        }
    }

    updateProposta({ status_proposta, id , updated }: any) {
        this.propostaService.updateProposal(status_proposta, id, updated)
            .subscribe({
                next: (res: any) => {
                    console.log(res)
                },
                error: (err: any) => {
                    console.log(err.status);
                    console.log(err.erro)
                }
            })

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


    onDelete(){
        this.propostaService.deleteProposal(this.id).subscribe((data)=>{})
        this.router.navigate(["/proposal"])
    }


    clickWithName() {
        this.userInfo = this.loginService.currentUser;
        this.onCreateProposal(this.newProposalService.functionCorpoObj('influenciador', JSON.stringify(this.proposalForm.value.description),
            this.userInfo.id, this.idEmpresa, this.userInfo.id, JSON.stringify(this.proposalForm.value.name) ))
    }

    loadIdEmpresa(name: any) {
        this.proposalFormService.getEmpresaName(name).subscribe((data) => {
            this.idEmpresa = data.id
        })
    }

    
    onClickCancel() {
        this.router.navigate(["/proposal"])
    }


}


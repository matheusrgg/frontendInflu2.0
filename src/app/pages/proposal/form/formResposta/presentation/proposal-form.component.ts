import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


import { ActivatedRoute, ParamMap, Router } from '@angular/router';


import { UtilsService } from 'src/app/shared/utils/utils.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ProposalInterface } from '../proposal-interface';

import { PropostaService } from 'src/app/shared/services/proposta/proposta.service';
import { Enterprise, Influencer } from 'src/app/pages/logged-home/interfaces/influencer.interface';
import { LoginService } from 'src/app/pages/login/service/login.service';


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
    proposal: any = []

    id: any;
    bussinessMan: any
    updatedStatus:string = "false"
    statusPropostaBody:string = ""
    constructor(
        private router: Router,
        private loginService: LoginService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
        private loadingService: LoadingService,
        private propostaService: PropostaService
    ) { }

    proposalForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    })


    ngOnInit(): void {
        this.userInfo = this.loginService.currentUser;
        this.route.paramMap.subscribe((params: ParamMap) => {this.id = params.get('id')});
        this.getIdProposal(this.id)
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
            this.proposalForm.controls['name'].disable();
            this.proposalForm.controls['description'].disable();
        })
    }

    statusProposta(status: string) {
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

    onClickCancel() {
        this.router.navigate(["/proposal"])
    }

}
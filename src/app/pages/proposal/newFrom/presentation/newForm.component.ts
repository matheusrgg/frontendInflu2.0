import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { Enterprise, Influencer } from '../../../logged-home/interfaces/influencer.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../../../login/service/login.service';
import { ProposalInterface } from '../../form/proposal-interface';
import { ProposalFormService } from '../../form/service/proposal-form.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { NewProposalService } from 'src/app/shared/services/newProposal.service';
import { liatAllEnterpriseInfluencerService } from 'src/app/shared/services/requests/listAllEnterpriseInfleuncers.service';



interface Media {
    value: string;
    viewValue: string;
}


@Component({
    selector: 'app-newForm',
    templateUrl: './newForm.component.html',
    styleUrls: ['./newForm.component.scss']
})
export class NewFormComponent implements OnInit {

    
    
    userInfo: any;
    enterprises!: Enterprise[];
    influencers!: Influencer[];
    userType: string = '';
    constructor(
       private router: Router,
       private proposalFormService: ProposalFormService,
       private loadingService: LoadingService,
       private newProposalService: NewProposalService,
       private loginService: LoginService,
    
       private listAll : liatAllEnterpriseInfluencerService
    ) { }

    proposalForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    })


    ngOnInit(): void {
        this.userType = this.loginService.currentUser.perfil;
        this.listAll.listAllEnterprises().subscribe(datas => (this.enterprises = datas));
        this.listAll.listAllInfluencers().subscribe(datas => (this.influencers = datas));
    }


    
    onClickCancel() {
        this.router.navigate(["/proposal"])
    }

    // click(){
    //     console.log(this.proposalForm.value);
    //     this.userInfo = this.loginService.currentUser;
    //     this.onCreateProposal(
    //         this.newProposalService.functionCorpoObj(
    //             'influenciador', 
    //             JSON.stringify(this.proposalForm.value.description),
    //             this.userInfo.id,
    //             1, 
    //             this.userInfo.id
            
    //         ))
    // }


    click() {
        this.loadingService.loadingOn()
        this.userInfo = this.loginService.currentUser;

        if (this.userInfo.perfil === "empreendedor") {
            this.onCreateProposal(this.newProposalService.functionCorpoObj('marca', JSON.stringify(this.proposalForm.value.description),
                this.userInfo.id, 1, this.userInfo.id))
        }

        this.onCreateProposal(this.newProposalService.functionCorpoObj('influenciador', JSON.stringify(this.proposalForm.value.description),
            this.userInfo.id, 1, this.userInfo.id))
    }
    
    onCreateProposal(obj: ProposalInterface) {
        this.proposalFormService.createProposal(
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


}


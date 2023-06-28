import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from '../../../login/service/login.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { finalize } from 'rxjs';
import { listRecebidasEnviadasService } from 'src/app/shared/services/requests/listRecebidasEnviadas.service';



@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
  proposalsEnviadas!: any[];
  proposalsRecebidas!: any[];
  userType: string = '';
  userInfo: any;



  showReceivedProposals = true;
  showSentProposals = false;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private loginService: LoginService,
    private listProposalSerivce: listRecebidasEnviadasService,
    private listProposalEnviadasSerivce: listRecebidasEnviadasService,
    private utilsService: UtilsService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.loadingOn()

    this.userInfo = this.loginService.currentUser;
    this.userType = this.userInfo.perfil;
   
    // if (this.userInfo.perfil === "empreendedor") {
    //   this.listProposalSerivce.listAllProposalsEmpresasRecebidas().subscribe(
    //     data =>
    //     (
    //       this.proposalsRecebidas = data
    //       // console.log("oq ue aocntece aqui", data)
    //     )

    //   )}


    this.listProposalSerivce.listAllProposalsRecebidasInfluenciador().subscribe(
      (data) => {
        // console.log("o que vem daqui", data);
        this.proposalsRecebidas = data
        this.loadingService.loadingOff()
        console.log("this.proposal", this.proposalsRecebidas);
      }

    )

    this.utilsService.getProposta().subscribe((data: any) => {
      this.listProposalSerivce.listAllProposalsRecebidasInfluenciador().subscribe(
        data =>
          (this.proposalsRecebidas = data)
      )
    })

   

  }






  newProposal() {
    this.router.navigate(["/newForm"])
  }

  onClickEdit(id: any) {
    this.router.navigate(["/proposalForm", id])
  }

  sentProposals() {
    this.router.navigate(["proposalEnviadas/"])
  }
  
    back() {
      this.router.navigate(["/proposal"])
    }
  toggleReceivedProposals() {
    this.showReceivedProposals = true;
    this.showSentProposals = false;
  }

  toggleSentProposals() {
    this.showReceivedProposals = false;
    this.showSentProposals = true;
  }
} 
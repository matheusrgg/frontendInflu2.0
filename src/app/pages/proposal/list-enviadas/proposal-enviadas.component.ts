import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { listRecebidasEnviadasService } from 'src/app/shared/services/proposta/listRecebidasEnviadas.service';
import { LoginService } from '../../login/service/login.service';




@Component({
  selector: 'app-proposal-enviadas',
  templateUrl: './proposal-enviadas.component.html',
  styleUrls: ['./proposal-enviadas.component.scss']
})
export class ProposalEnviadasComponent implements OnInit {
 proposalsEnviadasTeste!: any;

 userInfo: any;
  constructor(
   private listProposalEnviadasSerivce: listRecebidasEnviadasService,
   private router: Router,
   private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.loginService.currentUser;
    this.loadApi()
  }


  loadApi(){

    if (this.userInfo.perfil === "empreendedor") {

      this.listProposalEnviadasSerivce.listAllProposalsEnviadasEmpresa().subscribe(
        data =>
        // console.log("teste data", data)
          (this.proposalsEnviadasTeste = data)
      )

    }else{
      this.listProposalEnviadasSerivce.listAllProposalsEnviadasInfluenciador().subscribe(
        data =>
        // console.log("teste data", data)
          (this.proposalsEnviadasTeste = data)
      )
    }
 
  }

   back(){
    this.router.navigate(["/proposal"])
   }

}




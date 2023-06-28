import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { listRecebidasEnviadasService } from 'src/app/shared/services/requests/listRecebidasEnviadas.service';




@Component({
  selector: 'app-proposal-enviadas',
  templateUrl: './proposal-enviadas.component.html',
  styleUrls: ['./proposal-enviadas.component.scss']
})
export class ProposalEnviadasComponent implements OnInit {
 proposalsEnviadasTeste!: any;


  constructor(
   private listProposalEnviadasSerivce: listRecebidasEnviadasService,
   private router: Router
  ) { }

  ngOnInit(): void {
    this.loadApi()
  }


  loadApi(){
    this.listProposalEnviadasSerivce.listAllProposalsEnviadasInfluenciador().subscribe(
        data =>
        // console.log("teste data", data)
          (this.proposalsEnviadasTeste = data)
      )
  }

   back(){
    this.router.navigate(["/proposal"])
   }

}




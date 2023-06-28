import { Injectable } from "@angular/core";
import { catchError, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from "@angular/forms";
@Injectable({
    providedIn: 'root'
})
export class ValidadorCpfCnpjService {
    constructor(

        public http: HttpClient,
    
    ) {

    }



    cnpjValidator(cnpj: string): boolean {
      cnpj = cnpj.replace(/[^\d]+/g, '');
  
      if (cnpj.length !== 14) {
        return false;
      }
  
      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(cnpj)) {
        return false;
      }
  
      // Calcula o primeiro dígito verificador
      let soma = 0;
      let peso = 2;
      for (let i = 11; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
      // Calcula o segundo dígito verificador
      soma = 0;
      peso = 2;
      for (let i = 12; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
      return parseInt(cnpj.charAt(12)) == digito1 && parseInt(cnpj.charAt(13)) == digito2;
    }

} 
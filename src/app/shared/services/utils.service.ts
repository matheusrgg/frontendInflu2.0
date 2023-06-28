import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UtilsService { 
    proposta = new Subject<any>();

    getProposta() {
        return this.proposta.asObservable();
    }

    setProposta(value: any){
        this.proposta.next(value);
    }
}
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable , Subject } from "rxjs";

@Injectable()
export class LoadingService{
	
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

// showLoaderUntilCompleted(obs$:Observable<any>): Observable<any>{
 
// }

loadingOn(){
	this.loadingSubject.next(true)
}
loadingOff(){
	this.loadingSubject.next(false)
}

}


import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Login } from "../interfaces/user.interface";
import jwt_decode from "jwt-decode";
import { IUser } from "../interfaces/user1.interface";
import { environment } from "src/environments/environment.development";
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private encodedToken: string | null = null;

    private readonly tokenKey = 'authToken';

    constructor(
        public http: HttpClient,
    ) {
        this.checkExistingToken();
    }

    private checkExistingToken() {
        if (sessionStorage.getItem(this.tokenKey)) {
            this.encodedToken = sessionStorage.getItem(this.tokenKey);
        }
    }

    public saveUser({ email, senha }: Login) {
        const url = environment.APILOGININFLUENCER;
        return this.http.post<any>(url, {
            email: email,
            senha: senha
        })
    }

    public saveUserEnterprise({ email, senha }: Login) {
        const url = environment.APILOGININEMPRESA;
        return this.http.post<any>(url, {
            email: email,
            senha: senha
        })
    }

    public setToken(encodedToken: string): void {
        this.encodedToken = encodedToken;
        sessionStorage.setItem(this.tokenKey, encodedToken);
    }

    public getToken(): string | null {
        return sessionStorage.getItem(this.tokenKey);
    }

    public removeToken(): void {
        this.encodedToken = null;
        sessionStorage.removeItem(this.tokenKey);
    }

    public isLoggedIn(): boolean {
        return !!this.getToken();
    }

    public get token() {
        return this.encodedToken;
    }

    public get currentUser() {

        if (!this.encodedToken) {
            throw Error(`No logged user`)
        }
        return jwt_decode(this.encodedToken) as IUser;
    }

    public getUserById(userId: string) {
        console.log(userId)
        const url = `${environment.APILISTAEMPRESA}/${userId}`;
        return this.http.get<any>(url);
    }

}
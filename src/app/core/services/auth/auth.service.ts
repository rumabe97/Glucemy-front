import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ILogin} from "../../auth/login.model";
import {IRegister} from "../../auth/register.model";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = environment.apiUrl + 'auth/';

    constructor(private http: HttpClient, private route: Router, private _socialAuthService: SocialAuthService) {

    }

    logIn(username: string, password: string): Observable<ILogin> {
        return this.http.post<ILogin>(this.url + 'login/', {username, password});
    }

    register(register: IRegister): Observable<any> {
        return this.http.post<any>(this.url + 'register/', register);
    }


    public saveToken(token: string): void {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', token);
    }

    public getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    public saveRefreshToken(token: string): void {
        localStorage.removeItem('refresh_token');
        localStorage.setItem('refresh_token', token);
    }

    public getRefreshToken(): string | null {
        return localStorage.getItem('refresh_token');
    }

    refreshToken(token: string) {
        return this.http.post(
            this.url + 'login/refresh/',
            {
                refresh: token,
            }
        );
    }

    googleLogin(access_token: string, id_token: string): Observable<any> {
        return this.http.post<ILogin>(this.url + 'social-login/google/', {access_token, id_token});
    }

    outlookLogin(access_token: string, id_token: string): Observable<any> {
        return this.http.post<ILogin>(this.url + 'social-login/outlook/', {access_token, id_token});
    }

    signOut(): void {
        localStorage.clear();
        this._socialAuthService.signOut();
    }
}
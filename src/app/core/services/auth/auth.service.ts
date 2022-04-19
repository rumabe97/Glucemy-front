import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Login} from "../../auth/login.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = environment.apiUrl + 'auth/';

    constructor(private http: HttpClient, private route: Router) {
    }

    logIn(email: string, password: string): Observable<Login> {
        return this.http.post<Login>(this.url + 'login/', {email, password});
    }

    // register(registerForm: FormGroup): Observable<Register> {
    //     return this.http.post<Register>(this.url + 'register/', registerForm);
    // }
    //
    // refresh(): Observable<Refresh> {
    //     return this.http.get<Refresh>(this.url + 'login/refresh/');
    // }

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

    // refreshToken(token: string) {
    //     console.log(this.url);
    //     return this.http.post(
    //         this.url + 'login/refresh/',
    //         {
    //             refresh: token,
    //         },
    //         httpOptions
    //     );
    // }

    signOut(): void {
        localStorage.clear();
        this.route.navigate(['/']).then();
    }
}
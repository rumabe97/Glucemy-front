import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {Observable} from "rxjs";
import {IUser} from "../../../shared/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    url = environment.apiUrl + 'users/';

    constructor(private http: HttpClient, private route: Router, private _socialAuthService: SocialAuthService) {
    }

    me(): Observable<IUser> {
        return this.http.get<IUser>(this.url + 'me/');
    }

    update(user: IUser): Observable<IUser> {
        return this.http.put<IUser>(this.url + user.id, user);
    }
}

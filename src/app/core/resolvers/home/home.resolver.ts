import {Injectable} from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../../services/user/user.service";

@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {
    constructor(private _userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._userService.getLastGlucose();
    }
}

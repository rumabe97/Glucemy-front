import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: SocialAuthService) {
    }

    redirect(flag: boolean): any {
        if (!flag) {
            this.router.navigate(['/login']).then(() => {});
        }
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        // return this.authService.authState.pipe(
        //     map(state=> {
        //         console.log(state);
        //         return !!state;
        //     }),
        //     catchError((error) => {
        //         return of(false);
        //     })
        // );
        return of(true);
    }
}

import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import {
    BehaviorSubject,
    filter,
    Observable,
    switchMap,
    take,
    throwError,
} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {catchError} from 'rxjs/operators';
import {HandleErrorServiceService} from "../../services/error-handling/handle-error.service";
import {Router} from "@angular/router";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );

    constructor(
        private error: HandleErrorServiceService,
        private authService: AuthService,
        private _router: Router
    ) {
    }

    private static addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token,
            },
        });
    }

    private static setHeaders(authReq: HttpRequest<any>) {
        if (!authReq.headers.has('Content-Type')) {
            authReq = authReq.clone({
                headers: authReq.headers.set('Content-Type', 'application/json'),
            });
        }
        if (!authReq.headers.has('Accept')) {
            authReq.clone({
                headers: authReq.headers.set('Accept', 'application/json'),
            });
        }
    }

    // intercept function
    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<any> {
        let authReq = request;
        const token = this.authService.getToken();
        if (!request.url.includes('auth/')) {
            if (token) {
                authReq = ServerErrorInterceptor.addTokenHeader(request, token);
            }
        }
        ServerErrorInterceptor.setHeaders(authReq);

        // returning an observable to complete the request cycle
        return next.handle(authReq).pipe(
            catchError((error) => {
                console.log('Error: ' + error);
                if (
                    error instanceof HttpErrorResponse &&
                    !authReq.url.includes('auth/') &&
                    error.status === 401
                ) {
                    return this.handle401Error(authReq, next);
                }
                this.error.handleError(error, error.error.detail);

                return throwError(error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        console.log('Handle 401');
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            const token = this.authService.getRefreshToken();
            if (token)
                return this.authService.refreshToken(token).pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;
                        this.authService.saveToken(token.access);
                        this.refreshTokenSubject.next(token.access);
                        return next.handle(
                            ServerErrorInterceptor.addTokenHeader(request, token.access)
                        );
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;
                        this.authService.signOut();
                        this._router.navigate(['/login']).then();
                        return throwError(err);
                    })
                );
            this._router.navigate(['/login']).then();
        }
        return this.refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) =>
                next.handle(ServerErrorInterceptor.addTokenHeader(request, token))
            )
        );
    }
}
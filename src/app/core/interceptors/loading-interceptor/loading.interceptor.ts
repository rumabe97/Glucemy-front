import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {LoadingService} from "../../services/loading/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private _loadingService: LoadingService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadingService.setLoading(true, request.url);
        return next.handle(request)
            .pipe(catchError((err) => {
                this._loadingService.setLoading(false, request.url);
                return throwError(err);
            }))
            .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    this._loadingService.setLoading(false, request.url);
                }
                return evt;
            }));
    }
}

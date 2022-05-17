import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
    providedIn: 'root',
})
export class HandleErrorServiceService {
    readonly url = environment.apiUrl + 'auth/';

    constructor(private toastService: HotToastService) {
    }

    // Handling HTTP Errors using Toaster
    public handleError(err: any, detail: string) {
        let errorMessage: string;
        let sendError: boolean = true;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            switch (err.status) {
                case 400:
                    errorMessage = 'Bad Request.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized.';
                    break;
                case 403:
                    errorMessage =
                        "You don't have permission to access the requested resource.";
                    break;
                case 404:
                    errorMessage = 'The requested resource does not exist.';
                    break;
                case 412:
                    errorMessage = 'Precondition Failed.';
                    break;
                case 500:
                    errorMessage = 'Internal Server Error.';
                    break;
                case 503:
                    errorMessage = 'The requested service is not available.';
                    break;
                case 422:
                    errorMessage = 'Validation Error!';
                    break;
                default:
                    errorMessage = 'Something went wrong!';
            }
        }
        if (sendError) {
            if (detail) errorMessage = detail;
            this.toastService.error(errorMessage);
        }
    }
}
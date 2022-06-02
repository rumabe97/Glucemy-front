import {Injectable} from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {RecordsService} from "../../services/records/records.service";

@Injectable({
    providedIn: 'root'
})
export class RecordByIdResolver implements Resolve<boolean> {
    constructor(private _recordsService: RecordsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._recordsService.get(route.params['id']);
    }
}

import {Injectable} from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {RecordsService} from "../../services/records/records.service";
import {DatePipe} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class RecordsResolver implements Resolve<boolean> {
    constructor(private _recordsService: RecordsService, private datePipe: DatePipe) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._recordsService.findByday(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
    }
}

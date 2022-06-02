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
export class StatisticsResolver implements Resolve<boolean> {
    constructor(private _recordsService: RecordsService, private datePipe: DatePipe) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7);

        return this._recordsService.charts(this.datePipe.transform(endDate, "yyyy-MM-dd"), this.datePipe.transform(startDate, "yyyy-MM-dd"));
    }
}

import {Injectable} from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {UserService} from "../../services/user/user.service";
import {RecordsService} from "../../services/records/records.service";
import {DatePipe} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<boolean> {
    constructor(private _userService: UserService, private _recordService: RecordsService, private datePipe: DatePipe) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);

        return forkJoin({
            lastGlucose: this._userService.getLastGlucose(),
            statistics: this._recordService.charts(this.datePipe.transform(startDate, "yyyy-MM-dd"), this.datePipe.transform(endDate, "yyyy-MM-dd")),
        });
    }
}

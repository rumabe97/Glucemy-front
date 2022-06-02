import {Injectable} from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {FoodService} from "../../services/food/food.service";

@Injectable({
    providedIn: 'root'
})
export class CalculatorResolver implements Resolve<boolean> {
    constructor(private _foodService: FoodService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._foodService.search({page: 1});
    }
}

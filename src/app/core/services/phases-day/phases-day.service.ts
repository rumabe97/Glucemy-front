import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IFood} from "../../../shared/models/food.model";
import {_clean} from "../../../shared/utils/utils";

@Injectable({
    providedIn: 'root'
})
export class PhasesDayService {

    url = environment.apiUrl + 'phases_day/';

    constructor(private _httpClient: HttpClient) {
    }

    create(food: IFood) {
        return this._httpClient.post<any>(`${this.url}`, _clean(food));
    }

    update(food: IFood) {
        return this._httpClient.put<IFood>(
            `${this.url}/${food?.id}`, _clean(food)
        );
    }

    search(query: any) {
        return this._httpClient.get<any>(
            `${this.url}`,
            {
                params: new HttpParams({fromObject: _clean(query)}),
            }
        );
    }

    get(id: string) {
        return this._httpClient.get<IFood>(`${this.url}/${id}`);
    }

    patch(food: IFood) {
        return this._httpClient.patch<IFood>(`${this.url}/${food?.id}`, _clean(food));
    }

    delete(id: string) {
        return this._httpClient.delete<IFood>(`${this.url}/${id}`);
    }
}

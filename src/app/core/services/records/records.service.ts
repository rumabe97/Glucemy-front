import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {_clean} from "../../../shared/utils/utils";
import {IRecords} from "../../../shared/models/records.model";

@Injectable({
    providedIn: 'root'
})
export class RecordsService {

    url = environment.apiUrl + 'records/';

    constructor(private _httpClient: HttpClient) {
    }

    create(record: IRecords) {
        return this._httpClient.post<any>(`${this.url}`, _clean(record));
    }

    update(records: IRecords) {
        return this._httpClient.put<IRecords>(
            `${this.url}${records?.id}`, _clean(records)
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
        return this._httpClient.get<IRecords>(`${this.url}${id}`);
    }

    patch(records: IRecords) {
        return this._httpClient.patch<IRecords>(`${this.url}${records?.id}`, _clean(records));
    }

    delete(id: string) {
        return this._httpClient.delete<IRecords>(`${this.url}${id}`);
    }

    charts(startDate: string, endDate: string) {
        return this._httpClient.get<any>(
            `${this.url}chart/${startDate}/${endDate}`
        );
    }

    report(startDate: string, endDate: string) {
        return this._httpClient.post(`${this.url}report/`, {
            start_date: startDate,
            end_date: endDate
        }, {responseType: 'blob'});
    }

    findByday(day:string){
        return this._httpClient.get<any>(
            `${this.url}day/${day}/`
        );
    }
}

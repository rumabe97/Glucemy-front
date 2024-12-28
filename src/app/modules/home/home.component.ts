import {Component, OnInit} from '@angular/core';
import {ILastGlucoseModel} from "../../shared/models/last.glucose.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../core/services/user/user.service";
import {forkJoin} from "rxjs";
import {RecordsService} from "../../core/services/records/records.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    glucoseData: ILastGlucoseModel;
    statisticsData: any;

    constructor(private _route: ActivatedRoute, private _userService: UserService, private _recordService: RecordsService, private datePipe: DatePipe) {
        const data = this._route.snapshot.data['response'];
        this.glucoseData = data.lastGlucose;
        this.statisticsData = data.statistics;
    }

    ngOnInit(): void {
    }

    addGlucose(isAdd: boolean) {
        if (isAdd) {
            const now = new Date();
            const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);

            forkJoin({
                lastGlucose: this._userService.getLastGlucose(),
                statistics: this._recordService.charts(this.datePipe.transform(startDate, "yyyy-MM-dd"), this.datePipe.transform(endDate, "yyyy-MM-dd")),
            }).subscribe(res => {
                this.glucoseData = res.lastGlucose;
                this.statisticsData = res.statistics;
            })
        }
    }
}

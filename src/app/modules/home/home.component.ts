import {Component, OnInit} from '@angular/core';
import {ILastGlucoseModel} from "../../shared/models/last.glucose.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    glucoseData: ILastGlucoseModel;

    constructor(private _route: ActivatedRoute,) {
        this.glucoseData = this._route.snapshot.data['response'];
    }

    ngOnInit(): void {
    }
}

import {Component, OnInit} from '@angular/core';
import {ILastGlucoseModel} from "../../shared/models/last.glucose.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../core/services/user/user.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    glucoseData: ILastGlucoseModel;

    constructor(private _route: ActivatedRoute, private _userService: UserService) {
        this.glucoseData = this._route.snapshot.data['response'];
    }

    ngOnInit(): void {
    }

    addGlucose(isAdd: boolean) {
        if (isAdd) {
            this._userService.getLastGlucose().subscribe(res => {
                this.glucoseData = res;
            })
        }
    }
}

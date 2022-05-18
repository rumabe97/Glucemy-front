import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    user: IUser;

    constructor(private _route: ActivatedRoute,) {
        this.user = this._route.snapshot.data['response'];
    }

    ngOnInit(): void {

    }

}

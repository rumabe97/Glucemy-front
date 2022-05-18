import {Component, Input, OnInit} from '@angular/core';
import {navConfig} from "./config";
import {IUser} from "../auth/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    config = navConfig;
    view: string = 'Home';

    @Input() user: IUser;

    constructor(private _router: Router, private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    changeView(item: any) {
        this.view = item.name;
        this._router.navigate([`app/${item.path}`]);
    }
}

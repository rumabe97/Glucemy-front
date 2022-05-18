import {Component, Input, OnInit} from '@angular/core';
import {navConfig} from "./config";
import {IUser} from "../auth/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    config = navConfig;
    view: string = 'Home';

    @Input() user: IUser;

    constructor() {
    }

    ngOnInit(): void {
    }

    changeView(item: any) {
        this.view = item.name;
        console.log(this.view);
    }
}

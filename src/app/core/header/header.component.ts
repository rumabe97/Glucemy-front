import {Component, OnInit} from '@angular/core';
import {navConfig} from "./config";
import {UserService} from "../services/user/user.service";
import {IUser} from "../auth/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    config = navConfig;

    user: IUser;
    constructor(private _userService: UserService) {
    }

    ngOnInit(): void {
        this._userService.me().subscribe(user => {
            this.user = user;
        })
    }

}

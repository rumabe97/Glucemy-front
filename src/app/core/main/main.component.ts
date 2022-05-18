import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {IUser} from "../auth/user.model";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    user: IUser;

    constructor(private _userService: UserService) {
    }

    ngOnInit(): void {
        this._userService.me().subscribe(user => {
            this.user = user;
        })
    }

}

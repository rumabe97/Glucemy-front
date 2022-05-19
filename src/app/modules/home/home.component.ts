import {Component, OnInit} from '@angular/core';
import {homeConfig} from "../../shared/components/header/config";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    config = homeConfig;
    arrow = faArrowRight;

    constructor(private _router: Router, private _authService: AuthService) {
    }

    ngOnInit(): void {
    }

    navigate(item: any) {
        if (item.name === 'Logout') {
            this.logOut();
            return;
        }

        this._router.navigate([`app/${item.path}`]).then();
    }

    logOut() {
        this._authService.signOut();
        this._router.navigate(['/login']).then();
    }

}

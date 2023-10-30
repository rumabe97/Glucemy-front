import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {LoadingService} from "../../../core/services/loading/loading.service";
import {delay} from "rxjs";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    user: IUser;
    loading: boolean = false;

    constructor(private _route: ActivatedRoute, private _loadingService: LoadingService) {
        this.user = this._route.snapshot.data['response'];
    }

    ngOnInit(): void {
        this.listenToLoading();
    }

    listenToLoading(): void {
        this._loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
            this.loading = loading;
        })
    }
}

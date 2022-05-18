import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IUser} from "../../shared/models/user.model";
import {UserService} from "../../core/services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: IUser;

    form: FormGroup;

    constructor(private _formBuilder: FormBuilder, private _userService: UserService, private _route: ActivatedRoute, private _toastService: HotToastService) {
    }

    ngOnInit(): void {
        this.user = this._route.snapshot.data['response'];
        this.formInit();
    }

    formInit() {
        this.form = this._formBuilder.group({
            first_name: [this.user?.first_name ?? ''],
            last_name: [this.user?.last_name ?? ''],
            email: [this.user?.email ?? ''],
            weight: [this.user?.weight ?? ''],
            height: [this.user?.height ?? ''],
            age: [this.user?.age ?? ''],
        });
    }

    updateUser() {
        const user: IUser = {
            ...this.form.value,
            id: this.user.id
        }
        this._userService.update(user).subscribe(
            (response) => {
                this.user = response;
                this._toastService.success('Profile updated successfully');
            }
        );
    }
}

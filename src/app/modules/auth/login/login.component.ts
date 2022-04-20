import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    isSubmitted = false;

    constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _socialAuthService: SocialAuthService) {
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.form = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    formSubmit(type: string): boolean {
        if (!this.isSubmitted) return true;
        return this.form.get(type)?.valid === true;
    }

    login() {
        this.isSubmitted = true;
        if (this.form.invalid) return;
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;

        this._authService.logIn(username, password).subscribe(res => {
            this._authService.saveToken(res.access);
            this._authService.saveRefreshToken(res.refresh);
        });
    }

    loginWithGoogle() {
        this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(res => {
                this.getUser(res);
            });
    }

    private getUser(res) {
        this._authService.googleLogin(res.authToken, res.idToken).subscribe(res => {
            this._authService.saveToken(res.access_token);
            this._authService.saveRefreshToken(res.refresh_token);
        });
    }
}

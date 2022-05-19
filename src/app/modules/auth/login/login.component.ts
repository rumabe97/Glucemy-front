import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {GoogleLoginProvider, MicrosoftLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {IRegister} from "../../../core/auth/register.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    isSubmitted = false;
    register = false;

    constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _socialAuthService: SocialAuthService, private _router: Router,) {
    }

    ngOnInit(): void {
        this.formInit();
        this._socialAuthService.authState.subscribe(state => {
            if (state) {
                state.provider === "MICROSOFT" ? this.getUserOutlook(state) : this.getUser(state);
            }
        });
    }

    formInit() {
        this.form = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.email]],
            password2: ['', [Validators.required, Validators.minLength(6)]],
            usernameRegister: ['', [Validators.required]],
            passwordRegister: ['', [Validators.required, Validators.minLength(6)]],
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
        });
    }

    formSubmit(type: string): boolean {
        if (!this.isSubmitted) return true;
        return this.form.get(type)?.valid === true;
    }

    login() {
        this.isSubmitted = true;
        if (!this.loginValid()) return;
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;

        this._authService.logIn(username, password).subscribe(res => {
            this._authService.saveToken(res.access);
            this._authService.saveRefreshToken(res.refresh);
            this._router.navigate([`app/`]).then();
        });
    }

    loginValid() {
        return this.form.get('username')?.valid && this.form.get('password')?.valid;
    }

    loginWithGoogle() {
        this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, {ux_mode: 'redirect'});
    }

    loginWithOutlook() {
        this._socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID, {ux_mode: 'redirect'});
    }

    private getUser(res) {
        this._authService.googleLogin(res.authToken, res.idToken).subscribe(res => {
            this._authService.saveToken(res.access_token);
            this._authService.saveRefreshToken(res.refresh_token);
            this._router.navigate([`app/`]).then();
        });
    }

    private getUserOutlook(res) {
        this._authService.outlookLogin(res.authToken, res.idToken).subscribe(res => {
            this._authService.saveToken(res.access_token);
            this._authService.saveRefreshToken(res.refresh_token);
            this._router.navigate([`app/`]).then();
        });
    }

    newUser() {
        const registerUser: IRegister = {
            username: this.form.get('usernameRegister')?.value,
            password: this.form.get('passwordRegister')?.value,
            email: this.form.get('email')?.value,
            password2: this.form.get('password2')?.value,
            first_name: this.form.get('first_name')?.value,
            last_name: this.form.get('last_name')?.value,
        };

        this._authService.register(registerUser).subscribe(res => {
            this._authService.saveToken(res.token.access);
            this._authService.saveRefreshToken(res.token.refresh);
        });
    }
}

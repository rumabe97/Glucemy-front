import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    isSubmitted = false;

    constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.form = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
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
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;

        this._authService.logIn(email, password).subscribe(res => {
            console.log(res);
        });
    }
}

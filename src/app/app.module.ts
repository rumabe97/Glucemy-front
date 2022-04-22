import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./modules/auth/auth.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {GoogleLoginProvider, MicrosoftLoginProvider, SocialLoginModule} from "@abacritt/angularx-social-login";
import {googleConfig, microsoftConfig} from "./loginsConfig";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        CommonModule,
        HttpClientModule,
        SocialLoginModule
    ],
    providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider('134169247632-318tks8l71omeg5v4vubvomn6qfkoiov.apps.googleusercontent.com',  googleConfig),
                },
                {
                    id: MicrosoftLoginProvider.PROVIDER_ID,
                    provider: new MicrosoftLoginProvider('b7a2899a-d79e-489d-9c1f-ce1ff4d7f6ad', microsoftConfig)
                }
            ]
        }
    },
        /*AuthGuardService*/],
    bootstrap: [AppComponent]
})
export class AppModule {
}

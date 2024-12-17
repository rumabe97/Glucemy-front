import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./modules/auth/auth.module";
import {CommonModule, DatePipe} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GoogleLoginProvider, MicrosoftLoginProvider, SocialLoginModule} from "@abacritt/angularx-social-login";
import {googleConfig, microsoftConfig} from "./loginsConfig";
import {HeaderComponent} from './shared/components/header/header.component';
import {MainComponent} from './shared/components/main/main.component';
import {ServerErrorInterceptor} from "./core/interceptors/server-error/server-error.interceptor";
import {HotToastModule} from "@ngneat/hot-toast";
import {ProfileComponent} from './modules/profile/profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalculatorComponent} from './modules/calculator/calculator.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomeComponent} from './modules/home/home.component';
import {NgChartsModule} from 'ng2-charts';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { RecordsComponent } from './modules/records/records.component';
import { EditRecordComponent } from './modules/edit-record/edit-record.component';
import {LoaderComponent} from "./shared/components/loader/loader.component";
import {LoadingInterceptor} from "./core/interceptors/loading-interceptor/loading.interceptor";
import { CurrentGlucoseComponent } from './modules/home/current-glucose/current-glucose.component';
import { QuickEntryComponent } from './modules/home/quick-entry/quick-entry.component';
import { RecentHistoryComponent } from './modules/home/recent-history/recent-history.component';
import { FoodDataComponent } from './modules/home/food-data/food-data.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoaderComponent,
        MainComponent,
        ProfileComponent,
        CalculatorComponent,
        HomeComponent,
        StatisticsComponent,
        RecordsComponent,
        EditRecordComponent,
        CurrentGlucoseComponent,
        QuickEntryComponent,
        RecentHistoryComponent,
        FoodDataComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        CommonModule,
        HttpClientModule,
        SocialLoginModule,
        HotToastModule.forRoot(),
        ReactiveFormsModule,
        FontAwesomeModule,
        NgChartsModule,
        FormsModule
    ],
    providers: [
        DatePipe,
        {
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider('134169247632-318tks8l71omeg5v4vubvomn6qfkoiov.apps.googleusercontent.com', googleConfig),
                },
                {
                    id: MicrosoftLoginProvider.PROVIDER_ID,
                    provider: new MicrosoftLoginProvider('66dacfe5-f462-40a1-a481-f027649e29b0', microsoftConfig)
                }
            ]
        }
    },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        }
        /*AuthGuardService*/],
    bootstrap: [AppComponent]
})
export class AppModule {
}

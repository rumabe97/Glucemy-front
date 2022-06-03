import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {MainComponent} from "./shared/components/main/main.component";
import {ProfileComponent} from "./modules/profile/profile.component";
import {ProfileResolver} from "./core/resolvers/profile/profile.resolver";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthNoGuardGuard} from "./core/guards/auth-no-guard.guard";
import {CalculatorComponent} from "./modules/calculator/calculator.component";
import {CalculatorResolver} from "./core/resolvers/calculator/calculator.resolver";
import {HomeComponent} from "./modules/home/home.component";
import {StatisticsComponent} from "./modules/statistics/statistics.component";
import {StatisticsResolver} from "./core/resolvers/statistics/statistics.resolver";
import {RecordsComponent} from "./modules/records/records.component";
import {RecordsResolver} from "./core/resolvers/records/records.resolver";
import {EditRecordComponent} from "./modules/edit-record/edit-record.component";
import {RecordByIdResolver} from "./core/resolvers/records/record-by-id.resolver";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthNoGuardGuard],
    },
    {
        path: 'app',
        component: MainComponent,
        canActivate: [AuthGuard],
        resolve: {response: ProfileResolver},
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                resolve: {response: ProfileResolver}
            },
            {
                path: 'calculator',
                component: CalculatorComponent,
                canActivate: [AuthGuard],
                resolve: {response: CalculatorResolver}
            },
            {
                path: 'statistics',
                component: StatisticsComponent,
                canActivate: [AuthGuard],
                resolve: {response: StatisticsResolver}
            },
            {
                path: 'records',
                component: RecordsComponent,
                canActivate: [AuthGuard],
                resolve: {response: RecordsResolver}
            },
            {
                path: 'records/new',
                component: EditRecordComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'records/:id',
                component: EditRecordComponent,
                resolve: {response: RecordByIdResolver},
                canActivate: [AuthGuard]
            },
        ],
    },
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full',
    },
    {path: '**', redirectTo: 'app'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

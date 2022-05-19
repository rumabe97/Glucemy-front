import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {MainComponent} from "./shared/components/main/main.component";
import {ProfileComponent} from "./modules/profile/profile.component";
import {ProfileResolver} from "./core/resolvers/profile.resolver";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthNoGuardGuard} from "./core/guards/auth-no-guard.guard";
import {CalculatorComponent} from "./modules/calculator/calculator.component";
import {CalculatorResolver} from "./core/resolvers/calculator.resolver";
import {HomeComponent} from "./modules/home/home.component";

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
              path:'',
              component:HomeComponent,
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
        ],
    },
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

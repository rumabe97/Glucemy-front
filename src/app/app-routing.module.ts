import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {MainComponent} from "./core/main/main.component";
import {ProfileComponent} from "./modules/profile/profile.component";
import {ProfileResolver} from "./core/resolvers/profile.resolver";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthNoGuardGuard} from "./core/guards/auth-no-guard.guard";

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
                component: ProfileComponent,
                canActivate: [AuthGuard],
                resolve: {response: ProfileResolver}
            }
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

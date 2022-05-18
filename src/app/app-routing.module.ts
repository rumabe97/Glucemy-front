import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {MainComponent} from "./core/main/main.component";
import {ProfileComponent} from "./modules/profile/profile.component";
import {ProfileResolver} from "./core/resolvers/profile.resolver";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'app',
        component: MainComponent,
        children: [
            {
                path: '',
                component: ProfileComponent,
                resolve: {response: ProfileResolver}
            }
        ],
        // canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

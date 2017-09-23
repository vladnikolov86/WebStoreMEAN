import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateLogin } from './user/login.guard';


import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [CanActivateLogin]
    }, {
        path: 'register',
        component: RegisterComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
}

)

export class AppRoutingModule { }
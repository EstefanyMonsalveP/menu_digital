import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';

export const routes: Routes = [
    {path: 'crud', component: CrudComponent},
    {path: 'login', component: Login},
    {path: 'registro', component: Registro},
    {path: 'forgot-password', component: ForgotPassword},
    {path: 'reset-password', component: ResetPassword},

];

import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud';
import { Login } from './login/login';
import { Registro } from './registro/registro';

export const routes: Routes = [
    {path: 'crud', component: CrudComponent},
    {path: 'login', component: Login},
    {path: 'registro', component: Registro}
];

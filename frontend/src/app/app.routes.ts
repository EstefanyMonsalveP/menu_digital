import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud';
import { Login } from './login/login';

export const routes: Routes = [
    {path: 'crud', component: CrudComponent},
    {path: 'login', component: Login}
];

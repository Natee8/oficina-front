import { Routes } from '@angular/router';
import { RegisterComponent } from '../app/features/auth/register/pages/register.component';
import { MainLayoutComponent } from './layout/authLayout/authLayout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      /* { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },*/
    ],
  },
];

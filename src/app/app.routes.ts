import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/pages/login.component';
import { RegisterComponent } from './features/auth/register/pages/register.component';
import { CreateCarComponent } from './features/car/pages/create/car.component';
import { CarComponent } from './features/car/pages/list/car.component';
import { CreateClientComponent } from './features/clients/pages/create/clients.component';
import { ClientsComponent } from './features/clients/pages/list/clients.component';
import { CreateEmployeeComponent } from './features/employees/pages/create/employees.component';
import { EmployeesComponent } from './features/employees/pages/list/employees.component';
import { OSsCreateComponent } from './features/osS/pages/create/oSs.component';
import { OSsComponent } from './features/osS/pages/list/oSs.component';
import { NfsGroupingStoreComponent } from './features/nfs/pages/grouping-store/nfs-grouping-store.component';
import { ProfileComponent } from './features/profile/pages/profile.component';
import { CreateStoreComponent } from './features/stores/pages/create/stores.component';
import { StoresComponent } from './features/stores/pages/list/stores.component';
import { TenantListComponent } from './features/tenant/pages/tenant-list.component';
import { MainLayoutComponent } from './layout/authLayout/authLayout.component';
import { NavBarLayout } from './layout/navBarLayout/navBarLayout';
import { SideBarLayout } from './layout/sideBarLayout/sideBarLayout.component';
import { NotFoundComponent } from './pages/notfound/notfound.component';
import { ServerErrorComponent } from './pages/serverError/serverError.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/pages/forgot-password.component';

export const routes: Routes = [
  // ROTAS COM NAVBAR
  {
    path: '',
    component: NavBarLayout,
    children: [
      {
        path: '',
        component: MainLayoutComponent,
        children: [{ path: '', component: LoginComponent }],
      },
      {
        path: 'login',
        component: MainLayoutComponent,
        children: [
          { path: '', component: LoginComponent }
        ],
      },
      {
        path: 'login/forgot-password',
        component: MainLayoutComponent,
        children: [
          { path: '', component: ForgotPasswordComponent }
        ],
      },
      {
        path: 'register',
        component: MainLayoutComponent,
        children: [{ path: '', component: RegisterComponent }],
      },
    ],
  },

  {
    path: '',
    component: SideBarLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'stores-list', component: StoresComponent, canActivate: [adminGuard] },
      { path: 'os-list', component: OSsComponent },
      { path: 'employees-list', component: EmployeesComponent, canActivate: [adminGuard] },
      { path: 'clients-list', component: ClientsComponent },
      { path: 'car-list', component: CarComponent },
      { path: 'nfs-grouping-store', component: NfsGroupingStoreComponent },
      { path: 'tenant-list', component: TenantListComponent, canActivate: [adminGuard] },
      { path: 'profile', component: ProfileComponent },

      { path: 'employees-create', component: CreateEmployeeComponent, canActivate: [adminGuard] },
      { path: 'clients-create', component: CreateClientComponent },
      { path: 'stores-create', component: CreateStoreComponent, canActivate: [adminGuard] },
      { path: 'car-create', component: CreateCarComponent },
      { path: 'os-create', component: OSsCreateComponent },
    ],
  },
  //rotas de erros

  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

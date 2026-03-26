import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/pages/login.component';
import { StoresComponent } from './features/stores/pages/list/stores.component';
import { CreateStoreComponent } from './features/stores/pages/create/stores.component';
import { SideBarLayout } from './layout/sideBarLayout/sideBarLayout.component';
import { NavBarLayout } from './layout/navBarLayout/navBarLayout';
import { MainLayoutComponent } from './layout/authLayout/authLayout.component';
import { OSsComponent } from './features/osS/pages/list/oSs.component';
import { EmployeesComponent } from './features/employees/pages/list/employees.component';
import { ClientsComponent } from './features/clients/pages/list/clients.component';
import { CreateClientComponent } from './features/clients/pages/create/clients.component';
import { CarComponent } from './features/car/pages/list/car.component';
import { CreateCarComponent } from './features/car/pages/create/car.component';
import { ProfileComponent } from './features/profile/pages/profile.component';
import { RegisterComponent } from './features/auth/register/pages/register.component';
import { TenantListComponent } from './features/tenant/pages/tenant-list.component';
import { CreateEmployeeComponent } from './features/employees/pages/create/employees.component';
import { OSsCreateComponent } from './features/osS/pages/create/oSs.component';
import { authGuard } from './core/guards/auth.guard';

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
    children: [
      { path: 'stores-list', component: StoresComponent },
      { path: 'os-list', component: OSsComponent },
      { path: 'employees-list', component: EmployeesComponent },
      { path: 'clients-list', component: ClientsComponent },
      { path: 'car-list', component: CarComponent },
      { path: 'tenant-list', component: TenantListComponent },
      { path: 'profile', component: ProfileComponent },

      { path: 'employees-create', component: CreateEmployeeComponent },
      { path: 'clients-create', component: CreateClientComponent },
      { path: 'stores-create', component: CreateStoreComponent },
      { path: 'car-create', component: CreateCarComponent },
      { path: 'os-create', component: OSsCreateComponent },
    ],
  },
];

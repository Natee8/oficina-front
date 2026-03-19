import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/pages/login.component';
import { StoresComponent } from './features/stores/pages/list/stores.component';
import { CreateStoreComponent } from './features/stores/pages/create/stores.component';
import { SideBarLayout } from './layout/sideBarLayout/sideBarLayout.component';
import { NavBarLayout } from './layout/navBarLayout/navBarLayout';
import { MainLayoutComponent } from './layout/authLayout/authLayout.component';
import { OSsComponent } from './features/osS/pages/oSs.component';
import { EmployeesComponent } from './features/employees/pages/list/employees.component';
import { ClientsComponent } from './features/clients/pages/list/clients.component';
import { CreateClientComponent } from './features/clients/pages/create/clients.component';
import { CarComponent } from './features/car/pages/car.component';
import { ProfileComponent } from './features/profile/pages/profile.component';
import { RegisterComponent } from './features/auth/register/pages/register.component';
import { TenantListComponent } from './features/tenant/pages/tenant-list.component';
import { CreateEmployeeComponent } from './features/employees/pages/create/employees.component';

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

  // ROTAS COM SIDEBAR
  {
    path: 'stores-list',
    component: SideBarLayout,
    children: [{ path: '', component: StoresComponent }],
  },
  {
    path: 'os-list',
    component: SideBarLayout,
    children: [{ path: '', component: OSsComponent }],
  },
  {
    path: 'employees-list',
    component: SideBarLayout,
    children: [{ path: '', component: EmployeesComponent }],
  },
  {
    path: 'clients-list',
    component: SideBarLayout,
    children: [{ path: '', component: ClientsComponent }],
  },
  {
    path: 'car-list',
    component: SideBarLayout,
    children: [{ path: '', component: CarComponent }],
  },
  {
    path: 'tenant-list',
    component: SideBarLayout,
    children: [{ path: '', component: TenantListComponent }],
  },
  {
    path: 'profile',
    component: SideBarLayout,
    children: [{ path: '', component: ProfileComponent }],
  },
  {
    path: 'employees-create',
    component: SideBarLayout,
    children: [{ path: '', component: CreateEmployeeComponent }],
  },
  {
    path: 'clients-create',
    component: SideBarLayout,
    children: [{ path: '', component: CreateClientComponent }],
  },
  {
    path: 'stores-create',
    component: SideBarLayout,
    children: [{ path: '', component: CreateStoreComponent }],
  },
];

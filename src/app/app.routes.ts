import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/pages/register.component';
import { StoresComponent } from './features/stores/pages/stores.component';

import { SideBarLayout } from './layout/sideBarLayout/sideBarLayout.component';
import { NavBarLayout } from './layout/navBarLayout/navBarLayout';
import { MainLayoutComponent } from './layout/authLayout/authLayout.component';
import { OSsComponent } from './features/osS/pages/oSs.component';
import { EmployeesComponent } from './features/employees/pages/employees.component';
import { ClientsComponent } from './features/clients/pages/clients.component';

export const routes: Routes = [
  // ROTAS COM NAVBAR
  {
    path: '',
    component: NavBarLayout,
    children: [
      {
        path: '',
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
];

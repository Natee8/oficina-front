import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.scss'],
  imports: [RouterModule, NgClass, NgIf],
})
export class SideBarComponent {
  collapsed = false;

  submenus: { [key: string]: boolean } = {
    stores: false,
    employees: false,
    clients: false,
    oss: false,
    cars: false,
  };

  constructor(private router: Router) {}

  get storesOpen() {
    return this.submenus['stores'];
  }
  get employeesOpen() {
    return this.submenus['employees'];
  }
  get clientsOpen() {
    return this.submenus['clients'];
  }
  get ossOpen() {
    return this.submenus['oss'];
  }
  get carsOpen() {
    return this.submenus['cars'];
  }
  get tenantsOpen() {
    return this.submenus['tenants'];
  }

  toggleSidebar() {
    if (this.collapsed) {
      this.collapsed = false;
    } else {
      this.collapsed = true;
      for (const key in this.submenus) {
        this.submenus[key] = false;
      }
    }
  }

  expandSidebar() {
    if (this.collapsed) {
      // Se estiver fechado, apenas abre
      this.collapsed = false;
    } else {
      // Se já estiver aberto, redireciona para o perfil
      this.router.navigate(['/profile']);
    }
  }

  toggleSubmenu(name: string) {
    if (!this.collapsed) {
      this.submenus[name] = !this.submenus[name];
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
    if (!this.collapsed) this.expandSidebar();
  }
}

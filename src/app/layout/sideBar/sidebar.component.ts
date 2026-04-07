import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { TokenService } from '../../core/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtService } from '../../core/services/jwt.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.scss'],
  imports: [RouterModule, NgClass, NgIf],
})
export class SideBarComponent {
  collapsed = false;
  emailLogged = '';
  userInitial = 'U';
  isAdmin = false;

  submenus: { [key: string]: boolean } = {
    stores: false,
    nfs: false,
    employees: false,
    clients: false,
    oss: false,
    cars: false,
    tenants: false,
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.emailLogged = user?.email || '';
      const displayName = user?.name || user?.userName || user?.email || '';
      this.userInitial = displayName.trim().charAt(0).toUpperCase() || 'U';
      this.isAdmin = JwtService.isAdmin() || String(user?.role || '').trim().toLowerCase() === 'admin';
    });
  }

  get storesOpen() {
    return this.submenus['stores'];
  }
  get employeesOpen() {
    return this.submenus['employees'];
  }
  get nfsOpen() {
    return this.submenus['nfs'];
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

  logout() {
    TokenService.removeToken();

    this.snackBar.open('Deslogado com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });

    this.router.navigate(['/']);
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
      this.collapsed = false;
    } else {
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

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { TokenService } from '../../core/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtService } from '../../core/services/jwt.service';

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

  submenus: { [key: string]: boolean } = {
    stores: false,
    employees: false,
    clients: false,
    oss: false,
    cars: false,
  };

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    console.log('Token:', TokenService.getToken()); // deve exibir o JWT
    console.log('Email do token:', JwtService.getEmail()); // deve exibir o email
    this.emailLogged = JwtService.getEmail() || '';
  }

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

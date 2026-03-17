import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.scss'],
  imports: [RouterModule],
})
export class SideBarComponent {
  collapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  expandSidebar() {
    if (this.collapsed) {
      this.collapsed = false;
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.expandSidebar();
  }
}

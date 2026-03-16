import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.scss'],
})
export class SideBarComponent {
  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  expandSidebar() {
    if (this.collapsed) {
      this.collapsed = false;
    }
  }
}

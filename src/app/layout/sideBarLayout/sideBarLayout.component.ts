import { Component } from '@angular/core';
import { NavbarComponent } from '../navBar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../sideBar/sidebar.component';

@Component({
  selector: 'navBar-Layout',
  standalone: true,
  templateUrl: './sideBarLayout.component.html',
  styleUrls: ['./sideBarLayout.component.scss'],
  imports: [SideBarComponent, RouterOutlet],
})
export class SideBarLayout {}

import { Component } from '@angular/core';
import { NavbarComponent } from '../navBar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'navBar-Layout',
  standalone: true,
  templateUrl: './navBarLayout.component.html',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
})
export class NavBarLayout {}

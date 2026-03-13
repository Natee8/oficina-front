import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './authLayout.component.html',
  styleUrls: ['./authLayout.component.scss'],
})
export class MainLayoutComponent {}

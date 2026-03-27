import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  imports: [RouterLink],
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goBack() {
    window.history.back();
  }
}

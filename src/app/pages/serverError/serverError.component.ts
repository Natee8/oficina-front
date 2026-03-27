import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  templateUrl: './serverError.component.html',
  styleUrls: ['./serverError.component.scss'],
  imports: [RouterLink],
})
export class ServerErrorComponent {
  constructor(private router: Router) {}

  reload() {
    window.location.reload();
  }
}

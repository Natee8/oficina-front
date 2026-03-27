import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  imports: [RouterLink],
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  reload() {
    TokenService.removeToken();
    this.router.navigate(['/']);
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-card',
  standalone: true,
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss'],
  imports: [CommonModule]
})
export class RegisterCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
  @Input() stepInfo?: string;
}

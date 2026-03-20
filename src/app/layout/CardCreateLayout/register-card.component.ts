import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-card',
  standalone: true,
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss'],
  imports: [CommonModule],
})
export class RegisterCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() backgroundImage: string = '';
  @Input() stpsatual = 1;
  @Input() steptotal = 1;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}

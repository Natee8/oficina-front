import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  @Input() label: string = 'Voltar';
  @Output() back = new EventEmitter<void>();
}

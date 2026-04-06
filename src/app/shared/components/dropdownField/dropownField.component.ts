import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropownField.component.html',
  styleUrls: ['./dropownField.component.scss'],
})
export class DropdownComponent {
  @Input() label: string = 'Abrir';
  open = false;

  toggle() {
    this.open = !this.open;
  }

  close() {
    this.open = false;
  }
}

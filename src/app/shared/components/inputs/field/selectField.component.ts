import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './selectField.component.html',
  styleUrls: ['./selectField.component.scss']
})
export class SelectFieldComponent {
  @Input() label = '';
  @Input() options: string[] = [];
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
}

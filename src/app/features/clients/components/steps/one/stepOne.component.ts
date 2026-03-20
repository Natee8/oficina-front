import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step-one-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepOne.component.html',
})
export class StepOneClientComponent {
  @Input() nome!: string;
  @Output() nomeChange = new EventEmitter<string>();

  @Input() cpfCnpj!: string;
  @Output() cpfCnpjChange = new EventEmitter<string>();

  @Input() email!: string;
  @Output() emailChange = new EventEmitter<string>();

  @Input() phone!: string;
  @Output() phoneChange = new EventEmitter<string>();
}

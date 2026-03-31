import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepOne.component.html',
})
export class StepOneComponent {
  @Input() name!: string;
  @Output() nameChange = new EventEmitter<string>();

  @Input() cpf!: string;
  @Output() cpfChange = new EventEmitter<string>();

  @Input() phone!: string;
  @Output() phoneChange = new EventEmitter<string>();

  @Input() errors: Record<string, string> = {};

  @Output() next = new EventEmitter<void>();
}

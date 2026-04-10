import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';

@Component({
  selector: 'form-forgot-step-one',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [CommonModule, FormsModule, InputFieldComponent],
})
export class FormForgotStepOneComponent {
  @Input() email = '';
  @Input() stepOneErrors: Record<string, string> = {};
  @Output() emailChange = new EventEmitter<string>();

  onEmailChange(value: string) {
    this.emailChange.emit(value);
  }
}

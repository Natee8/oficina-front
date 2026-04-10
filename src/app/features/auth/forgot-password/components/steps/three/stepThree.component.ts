import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';

@Component({
  selector: 'form-forgot-step-three',
  standalone: true,
  templateUrl: './stepThree.component.html',
  styleUrls: ['./stepThree.component.scss'],
  imports: [CommonModule, FormsModule, InputFieldComponent],
})
export class FormForgotStepThreeComponent {
  @Input() newPassword = '';
  @Input() confirmNewPassword = '';
  @Input() stepThreeErrors: Record<string, string> = {};
  @Output() newPasswordChange = new EventEmitter<string>();
  @Output() confirmNewPasswordChange = new EventEmitter<string>();

  onNewPasswordChange(value: string) {
    this.newPasswordChange.emit(value);
  }
  onConfirmNewPasswordChange(value: string) {
    this.confirmNewPasswordChange.emit(value);
  }
}

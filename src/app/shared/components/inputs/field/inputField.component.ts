import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CnpjMaskDirective } from '../../../utils/masks/CnpjMask';
import { MaskDirective } from '../../../utils/masks/maskDirective';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MaskDirective],
  templateUrl: './inputField.component.html',
  styleUrls: ['./inputField.component.scss'],
})
export class InputFieldComponent {
  @Input() type: 'text' | 'password' = 'text';
  @Input() id = '';
  @Input() label = '';
  @Input() value = '';
  @Input() maxlength?: number;
  @Input() disabled: boolean = false;
  @Input() mask?: 'cnpj' | 'phone';

  showPassword = false;
  inputFocused = false;

  get inputType() {
    if (this.disabled && this.type === 'password') return 'password';
    return this.type === 'password' ? (this.showPassword ? 'text' : 'password') : this.type;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

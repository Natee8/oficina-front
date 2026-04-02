import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskDirective } from '../../../utils/masks/maskDirective';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MaskDirective],
  templateUrl: './inputField.component.html',
  styleUrls: ['./inputField.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'password' | 'date' | 'number' = 'text';
  @Input() id = '';
  @Input() label = '';
  @Input() maxlength?: number;
  @Input() min?: string;
  @Input() max?: string;
  @Input() mask?: 'cnpj' | 'phone' | 'cpf' | 'email' | 'custom' | 'currency' | 'integer';
  @Input() errorMessage?: string;
  @Input() labelBgColor = 'var(--color-bg)';
  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  value: any = '';
  disabled = false;

  showPassword = false;
  inputFocused = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: any) {
    if (this.type === 'number') {
      const num = Number(value.toString().replace(/[^0-9.-]/g, ''));
      this.value = isNaN(num) ? null : num;
    } else {
      this.value = value;
    }

    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
    this.inputFocused = false;
  }

  get inputType() {
    if (this.type === 'password') {
      if (this.disabled) return 'password';
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

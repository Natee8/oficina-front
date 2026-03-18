import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  @Input() type: 'text' | 'password' = 'text';
  @Input() id = '';
  @Input() label = '';
  @Input() maxlength?: number;
  @Input() mask?: 'cnpj' | 'phone';

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

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
    this.inputFocused = false;
  }

  get inputType() {
    if (this.disabled && this.type === 'password') return 'password';
    return this.type === 'password' ? (this.showPassword ? 'text' : 'password') : this.type;
  }

  onValueChange(val: string) {
    this.value = val;
    this.valueChange.emit(val);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

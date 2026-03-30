import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './selectField.component.html',
  styleUrls: ['./selectField.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
})
export class SelectFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: Array<string | { label: string; value: any }> = [];

  @Input() id = '';
  @Input() errorMessage?: string;
  @Input() labelBgColor = '#fff';
  @Input() disabled = false;

  value: any = null;
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  getOptionLabel(option: string | { label: string; value: any }): string {
    return typeof option === 'string' ? option : option.label;
  }

  getOptionValue(option: string | { label: string; value: any }): any {
    return typeof option === 'string' ? option : option.value;
  }

  get hasValue() {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(value: any) {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }
}

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
  @Input() options: string[] = [];

  @Input() id = '';
  @Input() errorMessage?: string;
  @Input() labelBgColor = '#fff';
  disabled = false;

  value = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  get hasValue() {
    return !!this.value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  handleChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}

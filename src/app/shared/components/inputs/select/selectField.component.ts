import { Component, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
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
  @Input() multiple = false;

  @Input() id = '';
  @Input() errorMessage?: string;
  @Input() labelBgColor = '#fff';
  @Input() disabled = false;

  value: any = null;
  dropdownOpen = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  writeValue(value: any): void {
    this.value = this.multiple ? (Array.isArray(value) ? [...value] : []) : value;
  }

  getOptionLabel(option: string | { label: string; value: any }): string {
    return typeof option === 'string' ? option : option.label;
  }

  getOptionValue(option: any) {
    return typeof option === 'string' ? option : option.value;
  }

  get hasValue() {
    return Array.isArray(this.value) ? this.value.length > 0 : this.value != null && this.value !== '';
  }

  get selectedOptions() {
    if (!this.multiple || !Array.isArray(this.value)) {
      return [];
    }

    return this.options.filter((option) => this.isSelected(option));
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
    this.value = this.multiple && Array.isArray(value) ? [...value] : value;
    this.onChange(this.value);
    this.onTouched();
  }

  toggleDropdown(): void {
    if (this.disabled || !this.multiple) {
      return;
    }

    this.dropdownOpen = !this.dropdownOpen;
    this.onTouched();
  }

  toggleOption(option: string | { label: string; value: any }, event?: Event): void {
    event?.stopPropagation();

    if (this.disabled) {
      return;
    }

    const optionValue = this.getOptionValue(option);
    const currentValues = Array.isArray(this.value) ? [...this.value] : [];
    const selectedIndex = currentValues.findIndex((value) => this.areValuesEqual(value, optionValue));

    if (selectedIndex >= 0) {
      currentValues.splice(selectedIndex, 1);
    } else {
      currentValues.push(optionValue);
    }

    this.handleChange(currentValues);
  }

  removeOption(option: string | { label: string; value: any }, event: Event): void {
    event.stopPropagation();
    this.toggleOption(option);
  }

  isSelected(option: string | { label: string; value: any }): boolean {
    if (!Array.isArray(this.value)) {
      return false;
    }

    const optionValue = this.getOptionValue(option);
    return this.value.some((value: any) => this.areValuesEqual(value, optionValue));
  }

  private areValuesEqual(firstValue: any, secondValue: any): boolean {
    return String(firstValue) === String(secondValue);
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }
}

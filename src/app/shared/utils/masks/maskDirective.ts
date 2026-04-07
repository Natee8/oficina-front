import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMask]',
})
export class MaskDirective {
  @Input('appMask') maskType?:
    | 'cnpj'
    | 'phone'
    | 'cpf'
    | 'cep'
    | 'email'
    | 'custom'
    | 'currency'
    | 'integer';
  @Input() customPattern?: (value: string) => string;

  private isUpdating = false;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (!this.maskType || this.isUpdating) return;

    const input = this.el.nativeElement;
    let rawValue = input.value;
    let value = rawValue.replace(/\D/g, '');

    switch (this.maskType) {
      case 'email':
        value = rawValue.replace(/\s+/g, '').toLowerCase();
        break;

      case 'cnpj':
        if (value.length > 14) value = value.slice(0, 14);
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        break;

      case 'phone':
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value =
          value.length <= 10
            ? value.replace(/(\d{4})(\d)/, '$1-$2')
            : value.replace(/(\d{5})(\d)/, '$1-$2');
        break;

      case 'cpf':
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{3})(\d)/, '$1.$2');
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');
        break;

      case 'cep':
        if (value.length > 8) value = value.slice(0, 8);
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        break;

      case 'custom':
        if (this.customPattern) {
          value = this.customPattern(value);
        }
        break;

      case 'currency':
        value = value.replace(/\D/g, '');
        if (!value) {
          value = '';
          break;
        }
        if (value.length > 12) value = value.slice(0, 12);
        while (value.length < 3) value = '0' + value;
        const cents = value.slice(-2);
        let integer = value.slice(0, -2);
        integer = integer.replace(/^0+(?!$)/, '');
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        value = integer + ',' + cents;
        break;

      case 'integer':
        value = value.replace(/\D/g, '');
        break;
    }

    this.isUpdating = true;

    // Atualiza o DOM
    input.value = value;

    // Atualiza o Angular forms corretamente
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: true });
    }

    this.isUpdating = false;
  }
}

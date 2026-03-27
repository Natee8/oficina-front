import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMask]',
})
export class MaskDirective {
  @Input('appMask') maskType?: 'cnpj' | 'phone' | 'cpf' | 'email' | 'custom' | 'currency';
  @Input() customPattern?: (value: string) => string;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (!this.maskType) return;

    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');

    switch (this.maskType) {
      case 'email':
        value = input.value.replace(/\s+/g, '').toLowerCase();
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
      case 'custom':
        if (this.customPattern) {
          value = this.customPattern(value);
        }
        break;
      case 'currency':
        value = value.replace(/\D/g, '');
        if (value.length > 12) value = value.slice(0, 12);
        while (value.length < 3) value = '0' + value;
        let cents = value.slice(-2);
        let integer = value.slice(0, -2);
        integer = integer.replace(/^0+(?!$)/, '');
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        value = integer + ',' + cents;
        break;
    }
    input.value = value;
  }
}

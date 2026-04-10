import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-forgot-step-two',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
  imports: [CommonModule],
})
export class FormForgotStepTwoComponent implements AfterViewInit {
  @Input() code = '';
  @Input() stepTwoErrors: Record<string, string> = {};
  @Output() codeChange = new EventEmitter<string>();
  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  digits = Array(5);

  ngAfterViewInit() {
    // Focus no primeiro input ao renderizar
    this.focusInput(0);
  }

  onInput(event: any, index: number) {
    const input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 1) value = value[0];
    const codeArr = this.code.split('').concat(Array(5).fill(''));
    codeArr[index] = value;
    this.code = codeArr.slice(0, 5).join('');
    this.codeChange.emit(this.code);
    if (value && index < 4) this.focusInput(index + 1);
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.focusInput(index - 1);
    }
  }

  onPaste(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text') || '';
    if (/^\d{5}$/.test(pasted)) {
      this.code = pasted;
      this.codeChange.emit(this.code);
      setTimeout(() => this.focusInput(4), 0);
    }
    event.preventDefault();
  }

  private focusInput(index: number) {
    const inputs = this.codeInputs?.toArray();
    if (inputs && inputs[index]) {
      (inputs[index].nativeElement as HTMLInputElement).focus();
      (inputs[index].nativeElement as HTMLInputElement).select();
    }
  }
}

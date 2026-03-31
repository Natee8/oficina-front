import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-one-stores',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepOne.component.html',
})
export class StepOneStoresComponent {
  isValidEmail(value: string): boolean {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value);
  }
  @Input() data!: any;
  @Input() errors!: Record<string, string>;
}

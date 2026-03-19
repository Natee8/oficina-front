import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepThree.component.html',
})
export class StepTwoComponent {
  @Input() addressZip!: string;
  @Input() addressNumber!: string;
  @Input() addressStreet!: string;
  @Input() addressDistrict!: string;
  @Input() addressCity!: string;
  @Input() addressState!: string;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './stepTwo.component.html',
  imports: [InputFieldComponent, FormsModule],
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

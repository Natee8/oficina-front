import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarData } from '../../../model/dtos/vehicle.data';

@Component({
  selector: 'app-step-two-car',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepTwo.component.html',
})
export class StepTwoCarComponent {
  @Input() data!: CarData;
  @Output() dataChange = new EventEmitter<CarData>();

  @Input() errors: Record<string, string> = {};
}

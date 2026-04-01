import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { EmployeeData } from '../../../model/dtos/employer.data';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepOne.component.html',
})
export class StepOneComponent {
  @Input() data!: EmployeeData;
  @Input() errors: Record<string, string> = {};
}

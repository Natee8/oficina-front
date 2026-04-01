import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { EmployeeData } from '../../../model/dtos/employer.data';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
})
export class StepTwoComponent {
  @Input() data!: EmployeeData;
  @Input() errors: Record<string, string> = {};
}

import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { RegisterFormService } from '../../../model/state/stateForm';
import { NgIf } from '@angular/common';

@Component({
  selector: 'form-steptwo',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
  imports: [FormsModule, InputFieldComponent, NgIf],
})
export class FormStepTwo {
  constructor(public formService: RegisterFormService) {}
  @Input() stepTwoErrors: Record<string, string> = {};
}

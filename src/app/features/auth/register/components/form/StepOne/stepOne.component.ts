import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { RegisterFormService } from '../../../model/state/stateForm';
import { NgIf } from '@angular/common';

@Component({
  selector: 'form-stepone',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [FormsModule, InputFieldComponent, NgIf],
})
export class FormStepOne {
  @Input() stepOneErrors: Record<string, string> = {};

  constructor(public formService: RegisterFormService) {}
}

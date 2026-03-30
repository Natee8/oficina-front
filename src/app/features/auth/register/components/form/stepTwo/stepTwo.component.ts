import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { RegisterFormService } from '../../../model/state/stateForm';

@Component({
  selector: 'form-steptwo',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
  imports: [FormsModule, InputFieldComponent],
})
export class FormStepTwo {
  constructor(public formService: RegisterFormService) {}
}

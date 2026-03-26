import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { RegisterFormService } from '../../../model/state/stateForm';

@Component({
  selector: 'form-stepone',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [FormsModule, InputFieldComponent],
})
export class FormStepOne {
  constructor(public formService: RegisterFormService) {}
}

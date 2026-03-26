import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { RegisterFormService } from '../../../model/state/stateForm';

@Component({
  selector: 'form-stepthree',
  standalone: true,
  templateUrl: './stepThree.component.html',
  styleUrls: ['./stepThree.component.scss'],
  imports: [FormsModule, InputFieldComponent],
})
export class FormStepThree {
  constructor(public formService: RegisterFormService) {}
}

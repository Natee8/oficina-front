import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { FormStepOne } from '../components/form/StepOne/stepOne.component';
import { FormStepTwo } from '../components/form/StepTwo/stepTwo.component';
import { FormStepThree } from '../components/form/StepThree/stepThree.component';
import { RegisterFormService } from '../services/register-form.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [InputFieldComponent, FormStepOne, FormStepTwo, FormStepThree],
})
export class RegisterComponent {
  currentStep = 1;

  constructor(public formService: RegisterFormService) {}

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }
}

import { Component } from '@angular/core';
import { FormStepOne } from '../components/form/StepOne/stepOne.component';
import { RegisterFormService } from '../services/state/stateForm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormStepOne, CommonModule],
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
  submit() {
    console.log('enviando');
  }
}

import { Component } from '@angular/core';
import { FormStepOne } from '../components/form/StepOne/stepOne.component';
import { RegisterFormService } from '../services/state/stateForm';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../../../shared/components/buttonBack/buttonBack.component';
import { RouterLink } from '@angular/router';
import { FormStepTwo } from '../components/form/StepTwo/stepTwo.component';
import { FormStepThree } from '../components/form/stepThree/stepThree.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    FormStepOne,
    CommonModule,
    BackButtonComponent,
    RouterLink,
    FormStepTwo,
    FormStepThree,
    ToggleActionsComponent,
  ],
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

  handleNext() {
    this.nextStep();
  }

  submit() {
    console.log('enviando');
  }

  handleBack() {
    console.log('Botão de voltar clicado');
  }
}

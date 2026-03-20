import { Component } from '@angular/core';
import { FormStepOne } from '../components/form/stepOne/stepOne.component';
import { RegisterFormService } from '../services/state/stateForm';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormStepTwo } from '../components/form/stepTwo/stepTwo.component';
import { FormStepThree } from '../components/form/stepThree/stepThree.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';
import { BackButtonCircleComponent } from "../../../../shared/components/buttonBack/buttonBack.component";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    FormStepOne,
    CommonModule,
    RouterLink,
    FormStepTwo,
    FormStepThree,
    ToggleActionsComponent,
    BackButtonCircleComponent
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

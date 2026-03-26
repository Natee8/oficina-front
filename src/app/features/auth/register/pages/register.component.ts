import { Component } from '@angular/core';
import { FormStepOne } from '../components/form/stepOne/stepOne.component';
import { RegisterFormService } from '../model/state/stateForm';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormStepTwo } from '../components/form/stepTwo/stepTwo.component';
import { FormStepThree } from '../components/form/stepThree/stepThree.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';
import { BackButtonCircleComponent } from '../../../../shared/components/buttonBack/buttonBack.component';
import { OnboardingService } from '../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    BackButtonCircleComponent,
  ],
})
export class RegisterComponent {
  currentStep = 1;

  constructor(
    public formService: RegisterFormService,
    private onboardingService: OnboardingService,
    private snackBar: MatSnackBar,
  ) {}

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
    this.onboardingService.register().subscribe({
      next: (res: any) => {
        const message = res?.message || 'Cadastro realizado com sucesso!';

        this.snackBar.open(message, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        const message = err?.error?.message || err?.error?.title || 'Erro ao realizar cadastro!';

        this.snackBar.open(message, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }

  handleBack() {
    console.log('Botão de voltar clicado');
  }
}

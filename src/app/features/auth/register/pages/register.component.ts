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
import { stepOneSchema } from '../schemas/stepOne.schema';
import { stepTwoSchema } from '../schemas/stepTwo.schema';
import { stepThreeSchema } from '../schemas/stepThree.schema';

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
  stepOneErrors: Record<string, string> = {};
  stepTwoErrors: Record<string, string> = {};
  stepThreeErrors: Record<string, string> = {};

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
        this.showSnackbar(res?.message || 'Cadastro realizado com sucesso!', 'success');
      },
      error: (err) => {
        const message = err?.error?.message || err?.error?.title || 'Erro ao realizar cadastro!';
        this.showSnackbar(message, 'error');
      },
    });
  }

  private showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }

  handleNextAction() {
    try {
      // Limpa erros do step atual
      if (this.currentStep === 1) this.stepOneErrors = {};
      if (this.currentStep === 2) this.stepTwoErrors = {};
      if (this.currentStep === 3) this.stepThreeErrors = {};

      // Validação do step atual
      if (this.currentStep === 1) {
        stepOneSchema.validateSync(this.formService.stepOneData, { abortEarly: false });
      }
      if (this.currentStep === 2) {
        stepTwoSchema.validateSync(this.formService.stepTwoData, { abortEarly: false });
      }
      if (this.currentStep === 3) {
        stepThreeSchema.validateSync(this.formService.stepThreeData, { abortEarly: false });
      }

      // Se passar na validação
      if (this.currentStep < 3) {
        this.nextStep();
      } else {
        this.submit();
      }
    } catch (err: any) {
      // Captura os erros e mostra na UI
      if (err.inner) {
        for (const e of err.inner) {
          if (this.currentStep === 1) this.stepOneErrors[e.path!] = e.message;
          if (this.currentStep === 2) this.stepTwoErrors[e.path!] = e.message;
          if (this.currentStep === 3) this.stepThreeErrors[e.path!] = e.message;
        }
      }

      // **Importante**: impede o envio do formulário
      return;
    }
  }

  handleBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}

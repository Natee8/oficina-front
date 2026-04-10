import { Component } from '@angular/core';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPasswordRequest, VerifyResetCodeRequest, ResetPasswordRequest } from '../model/forgot-password.dto';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BackButtonCircleComponent } from '../../../../shared/components/buttonBack/buttonBack.component';
import { FormForgotStepOneComponent } from '../components/steps/one/stepOne.component';
import { FormForgotStepTwoComponent } from '../components/steps/two/stepTwo.component';
import { FormForgotStepThreeComponent } from '../components/steps/three/stepThree.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    BackButtonCircleComponent,
    FormForgotStepOneComponent,
    FormForgotStepTwoComponent,
    FormForgotStepThreeComponent,
    ToggleActionsComponent
  ],
})
export class ForgotPasswordComponent {
  currentStep = 1;
  stepOneErrors: Record<string, string> = {};
  stepTwoErrors: Record<string, string> = {};
  stepThreeErrors: Record<string, string> = {};
  email = '';
  code = '';
  newPassword = '';
  confirmNewPassword = '';
  loading = false;

  constructor(private router: Router, private forgotPasswordService: ForgotPasswordService) {}


  handleNextAction() {
    if (this.currentStep === 1) {
      this.solicitarCodigo();
    } else if (this.currentStep === 2) {
      this.verificarCodigo();
    } else if (this.currentStep === 3) {
      this.redefinirSenha();
    }
  }

  solicitarCodigo() {
    this.stepOneErrors = {};
    if (!this.email || !this.email.includes('@')) {
      this.stepOneErrors['email'] = 'Email inválido';
      return;
    }
    this.loading = true;
    const data: ForgotPasswordRequest = { email: this.email };
    this.forgotPasswordService.solicitarCodigo(data).subscribe({
      next: () => {
        this.loading = false;
        this.currentStep = 2;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.stepOneErrors['email'] = err.error?.message || 'Erro ao solicitar código';
      }
    });
  }

  verificarCodigo() {
    this.stepTwoErrors = {};
    if (!this.code || this.code.length !== 5) {
      this.stepTwoErrors['code'] = 'Código inválido';
      return;
    }
    this.loading = true;
    const data: VerifyResetCodeRequest = { email: this.email, code: this.code };
    this.forgotPasswordService.verificarCodigo(data).subscribe({
      next: () => {
        this.loading = false;
        this.currentStep = 3;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.stepTwoErrors['code'] = err.error?.message || 'Código incorreto';
      }
    });
  }

  redefinirSenha() {
    this.stepThreeErrors = {};
    if (!this.newPassword || this.newPassword.length < 6) {
      this.stepThreeErrors['newPassword'] = 'Senha muito curta';
      return;
    }
    if (this.newPassword !== this.confirmNewPassword) {
      this.stepThreeErrors['confirmNewPassword'] = 'As senhas não coincidem';
      return;
    }
    this.loading = true;
    const data: ResetPasswordRequest = {
      email: this.email,
      code: this.code,
      newPassword: this.newPassword,
      confirmPassword: this.confirmNewPassword,
    };
    this.forgotPasswordService.redefinirSenha(data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.stepThreeErrors['newPassword'] = err.error?.message || 'Erro ao redefinir senha';
      }
    });
  }

  handleBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/login']);
    }
  }
}

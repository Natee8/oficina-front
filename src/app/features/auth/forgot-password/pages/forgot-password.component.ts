import { Component } from '@angular/core';
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

  constructor(private router: Router) {}


  handleNextAction() {
    if (this.currentStep < 3) this.currentStep++;
  }

  handleBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/login']);
    }
  }
}

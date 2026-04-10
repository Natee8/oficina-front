import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoComponent } from '../../components/steps/two/stepTwo.component';
import { StepThreeComponent } from '../../components/steps/three/stepThree.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { stepThreeEmployersSchema } from '../../schemas/stepThree.schema';
import { stepTwoEmployersSchema } from '../../schemas/stepTwo.schema';
import { stepOneEmployersSchema } from '../../schemas/stepOne.schema';
import { createEmployeeData, EmployeeData } from '../../model/dtos/employer.data';
import { stepsConfigCreateEmployees } from '../../../../core/config/stepsCreate.config';
import { buildEmployeePayload } from '../../shared/createPayloadFunction';
import { EmployeeService } from '../../service/employeer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    RouterModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    RegisterCardComponent,
    BackButtonComponent,
  ],
})
export class CreateEmployeeComponent {
  steps = stepsConfigCreateEmployees;
  stepIndex = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  employeeData: EmployeeData = createEmployeeData();
  errors: Record<string, string> = {};

  async nextStep() {
    this.errors = {};

    let schema;
    let values = {};

    if (this.stepIndex === 0) {
      schema = stepOneEmployersSchema;
      values = {
        nome: this.employeeData.nome,
        cpf: this.employeeData.cpf.replace(/\D/g, ''),
        telefone: this.employeeData.telefone.replace(/\D/g, ''),
      };
    } else if (this.stepIndex === 1) {
      schema = stepTwoEmployersSchema;
      values = {
        addressZip: this.employeeData.addressZip,
        addressNumber: this.employeeData.addressNumber,
        addressStreet: this.employeeData.addressStreet,
        addressDistrict: this.employeeData.addressDistrict,
        addressCity: this.employeeData.addressCity,
        addressState: this.employeeData.addressState,
      };
    } else if (this.stepIndex === 2) {
      schema = stepThreeEmployersSchema;
      values = {
        cargo: this.employeeData.cargo,
        loja: this.employeeData.loja,
        email: this.employeeData.email,
        senha: this.employeeData.senha,
      };
    } else {
      return;
    }

    try {
      await schema.validate(values, { abortEarly: false });
      if (this.stepIndex < this.steps.length - 1) this.stepIndex++;
      else this.finish();
    } catch (err: any) {
      this.errors = {};
      err.inner.forEach((e: any) => {
        if (e.path) this.errors[e.path] = e.message;
      });
    }
  }

  previousStep() {
    if (this.stepIndex > 0) this.stepIndex--;
  }

  goBackList() {
    this.router.navigate(['/employees-list']);
  }

  private sanitizeErrorMessage(message: string): string {
    const firstLine = message.split('\n')[0].trim();
    const cleanedMessage = firstLine.replace(/^.*?Exception:\s*/i, '').trim();

    return cleanedMessage || 'Erro ao cadastrar funcionário';
  }

  private getErrorMessage(error: unknown): string {
    const limitMsg = 'Limite de funcionários atingido';
    const planMsg = 'Limite do plano atingido';

    const checkLimit = (msg: string) =>
      msg.includes(limitMsg) || msg.includes(planMsg);

    if (typeof error === 'string' && error.trim()) {
      if (checkLimit(error)) {
        return 'Limite do plano atingido: não é possível criar mais funcionários neste plano. Faça um upgrade ou exclua funcionários antigos.';
      }
      return this.sanitizeErrorMessage(error);
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        if (checkLimit(apiError.error)) {
          return 'Limite do plano atingido: não é possível criar mais funcionários neste plano. Faça um upgrade ou exclua funcionários antigos.';
        }
        return this.sanitizeErrorMessage(apiError.error);
      }

      if (apiError.error && typeof apiError.error === 'object' && apiError.error.message?.trim()) {
        if (checkLimit(apiError.error.message)) {
          return 'Limite do plano atingido: não é possível criar mais funcionários neste plano. Faça um upgrade ou exclua funcionários antigos.';
        }
        return this.sanitizeErrorMessage(apiError.error.message);
      }

      if (apiError.message?.trim()) {
        if (checkLimit(apiError.message)) {
          return 'Limite do plano atingido: não é possível criar mais funcionários neste plano. Faça um upgrade ou exclua funcionários antigos.';
        }
        return this.sanitizeErrorMessage(apiError.message);
      }
    }

    return 'Erro ao cadastrar funcionário';
  }

  finish() {
    try {
      const payload = buildEmployeePayload(this.employeeData);

      this.employeeService.createEmployee(payload).subscribe({
        next: () => {
          this.snackBar.open('Funcionário cadastrado com sucesso!', 'Fechar', snackBarSuccessConfig);
          this.router.navigate(['/employees-list']);
        },
        error: (err) => {
          this.snackBar.open(this.getErrorMessage(err), 'Fechar', snackBarErrorConfig);
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        this.snackBar.open(err.message, 'Fechar', snackBarErrorConfig);
      }
    }
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { StepOneComponent } from '../steps/one/stepOne.component';
import { StepTwoComponent } from '../steps/two/stepTwo.component';
import { StepThreeComponent } from '../steps/three/stepThree.component';
import { stepsConfigEmployee } from '../../../../core/config/stepsPopup.config';
import { reviewEmployeeConfig } from '../../../../core/config/reviewsData';
import { createEmployeeData, EmployeeData } from '../../model/dtos/employer.data';
import { buildEmployeeUpdatePayload } from '../../shared/createPayloadFunction';
import { EmployeeService } from '../../service/employeer.service';
import { EmployeeListItem } from '../../model/dtos/employerPayload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';
import { stepOneEmployersSchema } from '../../schemas/stepOne.schema';
import { stepTwoEmployersSchema } from '../../schemas/stepTwo.schema';
import * as yup from 'yup';

const stepThreeEmployeeEditSchema = yup.object().shape({
  cargo: yup.string().required('O cargo é obrigatório'),
  loja: yup.array().of(yup.number()).default([]),
  email: yup.string().required('O email é obrigatório').email('Email inválido'),
  senha: yup.string().notRequired().test(
    'password-length',
    'A senha deve ter no mínimo 6 caracteres',
    (value) => !value || value.length >= 6,
  ),
});

@Component({
  selector: 'app-edit-employee-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    StepperComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    ReviewStepComponent,
    ToggleActionsComponent,
  ],
  templateUrl: './popupEdit.component.html',
  styleUrls: ['./popupEdit.component.scss'],
})
export class EditEmployeeModalComponent {
  stepIndex = 0;
  employeeData: EmployeeData = createEmployeeData();
  errors: Record<string, string> = {};

  cargos = ['Gerente', 'Atendente', 'Supervisor'];
  lojas = ['Loja 1', 'Loja 2'];

  @Input() employee: EmployeeListItem | null = null;
  @Input() store: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  stepsConfig = stepsConfigEmployee;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
  ) {}

  private normalizeRole(role: string | null | undefined): string {
    const normalizedRole = role?.trim().toLowerCase();

    const roleMap: Record<string, string> = {
      administrador: 'Admin',
      admin: 'Admin',
      funcionario: 'Comum',
      'funcionário': 'Comum',
      comum: 'Comum',
      employee: 'Comum',
    };

    return roleMap[normalizedRole ?? ''] ?? (role ?? '');
  }

  ngOnInit() {
    if (this.employee) {
      this.employeeData = {
        nome: this.employee.name,
        cpf: this.employee.cpfCnpj ?? '',
        telefone: this.employee.phoneNumber,
        addressZip: this.employee.addressZip ?? '',
        addressStreet: this.employee.addressStreet ?? '',
        addressNumber: this.employee.addressNumber ?? '',
        addressDistrict: this.employee.addressDistrict ?? '',
        addressCity: this.employee.addressCity ?? '',
        addressState: this.employee.addressState ?? '',
        cargo: this.normalizeRole(this.employee.role),
        loja: this.employee.unitIds ?? [],
        email: this.employee.email,
        senha: '',
      };
    }
  }

  async setStep(index: number) {
    if (index <= this.stepIndex) {
      this.stepIndex = index;
      return;
    }

    for (let currentIndex = this.stepIndex; currentIndex < index; currentIndex++) {
      const isValid = await this.validateStep(currentIndex);
      if (!isValid) {
        this.stepIndex = currentIndex;
        return;
      }
    }

    this.stepIndex = index;
  }

  get isLastStep() {
    return this.stepIndex === this.stepsConfig.length - 1;
  }

  next() {
    if (this.stepIndex < this.stepsConfig.length - 1) this.stepIndex++;
  }

  back() {
    if (this.stepIndex > 0) this.stepIndex--;
  }

  async handleNext() {
    if (this.isLastStep) {
      await this.save();
      return;
    }

    const isValid = await this.validateStep(this.stepIndex);
    if (!isValid) {
      return;
    }

    this.next();
  }

  handleBack() {
    if (this.stepIndex === 0) this.close();
    else this.back();
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'string' && error.trim()) {
      return error.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao atualizar funcionário.';
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        return apiError.error.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao atualizar funcionário.';
      }

      if (apiError.error && typeof apiError.error === 'object' && apiError.error.message?.trim()) {
        return apiError.error.message.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao atualizar funcionário.';
      }

      if (apiError.message?.trim()) {
        return apiError.message.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao atualizar funcionário.';
      }
    }

    return 'Erro ao atualizar funcionário.';
  }

  async save() {
    if (!this.employee?.id) {
      this.snackBar.open('Funcionário inválido para atualização.', 'Fechar', snackBarErrorConfig);
      return;
    }

    const areAllStepsValid = await this.validateAllSteps();
    if (!areAllStepsValid) {
      return;
    }

    const payload = buildEmployeeUpdatePayload(this.employeeData, this.employee);

    this.employeeService.updateEmployee(this.employee.id, payload).subscribe({
      next: () => {
        this.snackBar.open('Funcionário atualizado com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.close(true);
      },
      error: (err: any) => {
        this.snackBar.open(this.getErrorMessage(err), 'Fechar', snackBarErrorConfig);
      },
    });
  }

  close(updated = false) {
    this.closeModalEvent.emit(updated);
  }

  get reviewData() {
    return reviewEmployeeConfig.map((section) => ({
      title: section.title,
      fields: section.fields.map((field) => ({
        label: field.label,
        value: this.employeeData[field.key as keyof typeof this.employeeData],
      })),
    }));
  }

  private async validateAllSteps(): Promise<boolean> {
    for (let index = 0; index < 3; index++) {
      const isValid = await this.validateStep(index);
      if (!isValid) {
        this.stepIndex = index;
        return false;
      }
    }

    return true;
  }

  private async validateStep(stepIndex: number): Promise<boolean> {
    try {
      this.errors = {};

      const schemas = [stepOneEmployersSchema, stepTwoEmployersSchema, stepThreeEmployeeEditSchema];
      const values = [
        {
          nome: this.employeeData.nome,
          cpf: this.employeeData.cpf.replace(/\D/g, ''),
          telefone: this.employeeData.telefone.replace(/\D/g, ''),
        },
        {
          addressZip: this.employeeData.addressZip,
          addressNumber: this.employeeData.addressNumber,
          addressStreet: this.employeeData.addressStreet,
          addressDistrict: this.employeeData.addressDistrict,
          addressCity: this.employeeData.addressCity,
          addressState: this.employeeData.addressState,
        },
        {
          cargo: this.employeeData.cargo,
          loja: this.employeeData.loja,
          email: this.employeeData.email,
          senha: this.employeeData.senha,
        },
      ];

      await schemas[stepIndex].validate(values[stepIndex], { abortEarly: false });
      return true;
    } catch (err: any) {
      this.errors = {};

      if (Array.isArray(err?.inner) && err.inner.length > 0) {
        err.inner.forEach((error: any) => {
          if (error.path) {
            this.errors[error.path] = error.message;
          }
        });
      } else if (err?.path && err?.message) {
        this.errors[err.path] = err.message;
      } else {
        this.snackBar.open('Erro ao validar funcionário.', 'Fechar', snackBarErrorConfig);
      }

      return false;
    }
  }
}

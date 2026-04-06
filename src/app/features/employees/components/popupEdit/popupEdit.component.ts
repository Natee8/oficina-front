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
      administrador: 'admin',
      admin: 'admin',
      funcionario: 'employee',
      'funcionário': 'employee',
      comum: 'employee',
      employee: 'employee',
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

  setStep(index: number) {
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

  handleNext() {
    if (this.isLastStep) this.save();
    else this.next();
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

  save() {
    if (!this.employee?.id) {
      this.snackBar.open('Funcionário inválido para atualização.', 'Fechar', snackBarErrorConfig);
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
}

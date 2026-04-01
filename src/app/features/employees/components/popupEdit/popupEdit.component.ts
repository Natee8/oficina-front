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
import { Router } from '@angular/router';
import { buildEmployeePayload } from '../../shared/createPayloadFunction';
import { EmployeeService } from '../../service/employeer.service';

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

  @Input() employee: any;
  @Input() store: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  stepsConfig = stepsConfigEmployee;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.employee) {
      this.employeeData = {
        nome: this.employee.name,
        cpf: this.employee.cpfCnpj,
        telefone: this.employee.phoneNumber,
        addressZip: this.employee.addressZip,
        addressStreet: this.employee.addressStreet,
        addressNumber: this.employee.addressNumber,
        addressDistrict: this.employee.addressDistrict,
        addressCity: this.employee.addressCity,
        addressState: this.employee.addressState,
        cargo: this.employee.role,
        loja: this.employee.unitIds?.[0] ?? null,
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

  save() {
    const payload = buildEmployeePayload(this.employeeData);

    this.employeeService.createEmployee(payload).subscribe({
      next: () => {
        console.log('Funcionário atualizado com sucesso', payload);
        this.close();
      },
      error: (err: any) => {
        console.error('Erro ao atualizar funcionário', err);
      },
    });
  }

  close() {
    this.closeModalEvent.emit();
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

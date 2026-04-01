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
import { StepOneClientComponent } from '../../../clients/components/steps/one/stepOne.component';
import { stepsConfigEmployee } from '../../../../core/config/stepsLabel.config';

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
  employeeData: any = {};
  errors: Record<string, string> = {};

  cargos = ['Gerente', 'Atendente', 'Supervisor'];
  lojas = ['Loja 1', 'Loja 2'];

  @Input() employee: any;
  @Input() store: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  stepsConfig = stepsConfigEmployee;

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
    if (this.stepIndex < this.stepsConfig.length - 1) {
      this.stepIndex++;
    }
  }

  back() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    }
  }

  handleNext() {
    if (this.isLastStep) {
      this.save();
    } else {
      this.next();
    }
  }

  handleBack() {
    if (this.stepIndex === 0) {
      this.close();
      return;
    }

    this.back();
  }
  save() {
    const payload = {
      name: this.employeeData.nome,
      email: this.employeeData.email,
      phoneNumber: this.employeeData.telefone,
      password: this.employeeData.senha,
      role: this.employeeData.cargo,
      unitIds: this.employeeData.loja ? [this.employeeData.loja] : [],
      cpfCnpj: this.employeeData.cpf,
      addressZip: this.employeeData.addressZip,
      addressStreet: this.employeeData.addressStreet,
      addressNumber: this.employeeData.addressNumber,
      addressDistrict: this.employeeData.addressDistrict,
      addressCity: this.employeeData.addressCity,
      addressState: this.employeeData.addressState,
    };

    console.log('EDIT EMPLOYEE', payload);
  }

  close() {
    this.closeModalEvent.emit();
  }

  get reviewData() {
    return [
      {
        title: 'Dados pessoais',
        fields: [
          { label: 'Nome', value: this.employeeData.nome },
          { label: 'CPF', value: this.employeeData.cpf },
          { label: 'Telefone', value: this.employeeData.telefone },
        ],
      },
      {
        title: 'Endereço',
        fields: [
          { label: 'CEP', value: this.employeeData.addressZip },
          { label: 'Rua', value: this.employeeData.addressStreet },
          { label: 'Número', value: this.employeeData.addressNumber },
          { label: 'Bairro', value: this.employeeData.addressDistrict },
          { label: 'Cidade', value: this.employeeData.addressCity },
          { label: 'Estado', value: this.employeeData.addressState },
        ],
      },
      {
        title: 'Trabalho',
        fields: [
          { label: 'Cargo', value: this.employeeData.cargo },
          { label: 'Loja', value: this.employeeData.loja },
          { label: 'Email', value: this.employeeData.email },
        ],
      },
    ];
  }
}

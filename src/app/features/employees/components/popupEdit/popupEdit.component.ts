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

  name = '';
  cpf = '';
  phone = '';

  addressZip = '';
  addressStreet = '';
  addressNumber = '';
  addressDistrict = '';
  addressCity = '';
  addressState = '';

  cargo = '';
  loja = '';
  email = '';
  senha = '';

  cargos = ['Gerente', 'Atendente', 'Supervisor'];
  lojas = ['Loja 1', 'Loja 2'];

  @Input() employee: any;
  @Input() store: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  stepsConfig = stepsConfigEmployee;

  ngOnInit() {
    if (this.employee) {
      this.name = this.employee.name;
      this.cpf = this.employee.cpf;
      this.phone = this.employee.phone;

      this.addressZip = this.employee.zip;
      this.addressStreet = this.employee.street;
      this.addressNumber = this.employee.number;
      this.addressDistrict = this.employee.neighborhood;
      this.addressCity = this.employee.city;
      this.addressState = this.employee.state;

      this.cargo = this.employee.cargo;
      this.loja = this.employee.loja;
      this.email = this.employee.email;
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
      name: this.name,
      cpf: this.cpf,
      phone: this.phone,
      addressZip: this.addressZip,
      addressStreet: this.addressStreet,
      addressNumber: this.addressNumber,
      addressDistrict: this.addressDistrict,
      addressCity: this.addressCity,
      addressState: this.addressState,
      cargo: this.cargo,
      loja: this.loja,
      email: this.email,
      senha: this.senha,
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
          { label: 'Nome', value: this.name },
          { label: 'CPF', value: this.cpf },
          { label: 'Telefone', value: this.phone },
        ],
      },
      {
        title: 'Endereço',
        fields: [
          { label: 'CEP', value: this.addressZip },
          { label: 'Rua', value: this.addressStreet },
          { label: 'Número', value: this.addressNumber },
          { label: 'Bairro', value: this.addressDistrict },
          { label: 'Cidade', value: this.addressCity },
          { label: 'Estado', value: this.addressState },
        ],
      },
      {
        title: 'Trabalho',
        fields: [
          { label: 'Cargo', value: this.cargo },
          { label: 'Loja', value: this.loja },
          { label: 'Email', value: this.email },
        ],
      },
    ];
  }
}

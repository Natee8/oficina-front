import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/select/selectField.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoComponent } from '../../components/steps/two/stepTwo.component';
import { StepThreeComponent } from '../../components/steps/three/stepThree.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { stepThreeEmployersSchema } from '../../schemas/stepThree.schema';
import { stepTwoEmployersSchema } from '../../schemas/stepTwo.schema';
import { stepOneEmployersSchema } from '../../schemas/stepOne.schema';
import { createEmployeeData, EmployeeData } from '../../model/dtos/employer.data';

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
  steps = [
    {
      component: StepOneComponent,
      title: 'Informações do Funcionário',
      description: 'Adicione dados pessoais do funcionário',
      image: '/assets/images/employee.svg',
      background: '/assets/images/backOne.svg',
    },
    {
      component: StepTwoComponent,
      title: 'Endereço do Funcionário',
      description: 'Preencha o endereço do funcionário',
      image: '/assets/images/employee.svg',
      background: '/assets/images/backOne.svg',
    },
    {
      component: StepThreeComponent,
      title: 'Informações do Funcionário',
      description: 'Adicione as informações de cadastro do funcionário',
      image: '/assets/images/employee.svg',
      background: '/assets/images/backOne.svg',
    },
  ];
  stepIndex = 0;
  step = 1;
  steptotal = 3;

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
        cpf: this.employeeData.cpf,
        telefone: this.employeeData.telefone,
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
    console.log('logica aqui');
  }

  finish() {
    console.log('Cadastro finalizado!', {
      nome: this.employeeData.nome,
      cpf: this.employeeData.cpf,
      telefone: this.employeeData.telefone,
      addressZip: this.employeeData.addressZip,
      addressNumber: this.employeeData.addressNumber,
      addressStreet: this.employeeData.addressStreet,
      addressDistrict: this.employeeData.addressDistrict,
      addressCity: this.employeeData.addressCity,
      addressState: this.employeeData.addressState,
      cargo: this.employeeData.cargo,
      loja: this.employeeData.loja,
      email: this.employeeData.email,
      senha: this.employeeData.senha,
    });
  }
}

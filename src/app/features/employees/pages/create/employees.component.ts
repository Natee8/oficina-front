import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoComponent } from '../../components/steps/two/stepTwo.component';
import { StepThreeComponent } from '../../components/steps/three/stepThree.component';
import { BackButtonComponent } from '../../../../shared/components/buttonBack/buttonBack.component';

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
      background: '/assets/images/backTwo.svg',
    },
    {
      component: StepThreeComponent,
      title: 'Informações do Funcionário',
      description: 'Adicione as informações de cadastro do funcionário',
      image: '/assets/images/employee.svg',
      background: '/assets/images/backThree.svg',
    },
  ];
  stepIndex = 0;
  step = 1;
  steptotal = 3;

  nome = '';
  cpf = '';
  telefone = '';
  addressZip = '';
  addressNumber = '';
  addressStreet = '';
  addressDistrict = '';
  addressCity = '';
  addressState = '';
  cargo = '';
  loja = '';
  email = '';
  senha = '';
  cargos = ['Gerente', 'Atendente', 'Estoquista'];
  lojas = ['Matriz', 'Filial 1', 'Filial 2'];

  nextStep() {
    if (this.stepIndex < this.steps.length - 1) this.stepIndex++;
    else this.finish();
  }

  previousStep() {
    if (this.stepIndex > 0) this.stepIndex--;
  }

  goBackList() {
    console.log('logica aqui');
  }

  finish() {
    console.log('Cadastro finalizado!', {
      nome: this.nome,
      cpf: this.cpf,
      telefone: this.telefone,
      addressZip: this.addressZip,
      addressNumber: this.addressNumber,
      addressStreet: this.addressStreet,
      addressDistrict: this.addressDistrict,
      addressCity: this.addressCity,
      addressState: this.addressState,
      cargo: this.cargo,
      loja: this.loja,
      email: this.email,
      senha: this.senha,
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoComponent } from '../../components/steps/two/stepTwo.component';
import { StepThreeComponent } from "../../components/steps/three/stepThree.component";

@Component({
  selector: 'app-create-employee',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent,
    FormsModule,
    RouterModule,
    RegisterCardComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent
],
})
export class CreateEmployeeComponent {
  // register-employee.component.ts
  step = 1;
  steptotal = 3;

  // Dados dos forms
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

  get currentStep() {
    const steps = [
      {
        title: 'Informações do Funcionário',
        description: 'Adicione dados pessoais do funcionário',
        stepInfo: 'Etapa 1 - 3',
        image: 'assets/images/employee.svg',
      },
      {
        title: 'Endereço do Funcionário',
        description: 'Preencha o endereço do funcionário',
        stepInfo: 'Etapa 2 - 3',
        image: 'assets/images/employee.svg',
      },
      {
        title: 'Informações do Funcionário',
        description: 'Adicione as informações de cadastro do funcionário',
        stepInfo: 'Etapa 3 - 3',
        image: 'assets/images/employee.svg',
      },
    ];
    return steps[this.step - 1];
  }

  // Navegação
  nextStep() {
    if (this.step < this.steptotal) this.step++;
    else this.finish();
  }

  previousStep() {
    if (this.step > 1) this.step--;
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

  goBackList() {
    // lógica para voltar à lista
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { Router } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneClientComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoClientComponent } from '../../components/steps/two/stepTwo.component';
import { StepThreeClientComponent } from '../../components/steps/three/stepThree.component';

@Component({
  selector: 'app-create-client',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent,
    RegisterCardComponent,
    StepOneClientComponent,
    StepTwoClientComponent,
    StepThreeClientComponent,
  ],
})
export class CreateClientComponent {
  stepIndex = 0;

  steps = [
    {
      title: 'Informações do Cliente',
      description: 'Adicione dados pessoais do cliente',
      image: '/assets/images/client.svg',
      background: '/assets/images/backOne.svg',
    },
    {
      title: 'Endereço do Cliente',
      description: 'Preencha o endereço do cliente',
      image: '/assets/images/client.svg',
      background: '/assets/images/BackTwo.svg',
    },
    {
      title: 'Detalhes do Cliente',
      description: 'Preencha os detalhes do cliente',
      image: '/assets/images/client.svg',
      background: '/assets/images/backOne.svg',
    },
  ];

  nome = '';
  cpfCnpj = '';
  email = '';
  phone = '';

  addressZip = '';
  addressStreet = '';
  addressNumber = '';
  addressDistrict = '';
  addressCity = '';
  addressState = '';

  notes = '';
  loja = '';
  tipoLegal = '';

  lojas = ['Loja 1', 'Loja 2'];
  tiposLegais = ['Físico', 'Jurídico'];

  constructor(private router: Router) {}

  nextStep() {
    if (this.stepIndex < this.steps.length - 1) {
      this.stepIndex++;
    } else {
      this.submit();
    }
  }

  previousStep() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    }
  }

  goBackList() {
    this.router.navigate(['/clients-list']);
  }

  submit() {
    const payload = {
      nome: this.nome,
      cpfCnpj: this.cpfCnpj,
      email: this.email,
      phone: this.phone,
      addressZip: this.addressZip,
      addressStreet: this.addressStreet,
      addressNumber: this.addressNumber,
      addressDistrict: this.addressDistrict,
      addressCity: this.addressCity,
      addressState: this.addressState,
      loja: this.loja,
      tipoLegal: this.tipoLegal,
      notes: this.notes,
    };

    console.log('Cliente cadastrado!', payload);
  }
}

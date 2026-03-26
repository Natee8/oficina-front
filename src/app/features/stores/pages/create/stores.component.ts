import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';

import { StepOneStoresComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoStoresComponent } from '../../components/steps/two/stepTwo.component';

@Component({
  selector: 'app-create-store',
  standalone: true,
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RegisterCardComponent,
    BackButtonComponent,
    StepOneStoresComponent,
    StepTwoStoresComponent,
  ],
})
export class CreateStoreComponent {
  stepIndex = 0;

  steps = [
    {
      title: 'Informações da Loja',
      description: 'Adicione os dados da loja',
      image: '/assets/images/store.svg',
      background: '/assets/images/BackTwo.svg',
    },
    {
      title: 'Endereço da Loja',
      description: 'Preencha o endereço da loja',
      image: '/assets/images/store.svg',
      background: '/assets/images/BackTwo.svg',
    },
  ];


  name = '';
  cnpj = '';
  phone = '';
  email = '';

  addressZip = '';
  addressStreet = '';
  addressNumber = '';
  addressDistrict = '';
  addressCity = '';
  addressState = '';

  constructor(private router: Router) {}

  nextStep() {
    if (this.stepIndex < this.steps.length - 1) {
      this.stepIndex++;
    } else {
      this.finish();
    }
  }

  previousStep() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    }
  }

  goBackList() {
    this.router.navigate(['/stores-list']);
  }

  finish() {
    const payload = {
      name: this.name,
      cnpj: this.cnpj,
      phone: this.phone,
      email: this.email,
      addressZip: this.addressZip,
      addressStreet: this.addressStreet,
      addressNumber: this.addressNumber,
      addressDistrict: this.addressDistrict,
      addressCity: this.addressCity,
      addressState: this.addressState,
    };

    console.log('Loja cadastrada!', payload);
  }
}

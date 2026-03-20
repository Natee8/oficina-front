import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { Router } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneCarComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoCarComponent } from '../../components/steps/two/stepTwo.component';

@Component({
  selector: 'app-create-car',
  standalone: true,
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    BackButtonComponent,
    RegisterCardComponent,
    StepOneCarComponent,
    StepTwoCarComponent,
  ],
})
export class CreateCarComponent {
  stepIndex = 0;

  steps = [
    {
      title: 'Informações do Veículo',
      description: 'Preencha os dados do veículo',
      image: '/assets/images/car.svg',
      background: '/assets/images/backOne.svg',
    },
    {
      title: 'Detalhes do Veículo',
      description: 'Preencha os detalhes do veículo',
      image: '/assets/images/car.svg',
      background: '/assets/images/backOne.svg',
    },
  ];

  cliente = '';
  plate = '';
  year: number | null = null;
  vin = '';
  renavam = '';
  insuranceClaimNumber = '';

  brand = '';
  model = '';
  color = '';
  notes = '';

  clientes = ['Cliente 1', 'Cliente 2'];

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
    this.router.navigate(['/car-list']);
  }

  submit() {
    const payload = {
      cliente: this.cliente,
      plate: this.plate,
      year: this.year,
      vin: this.vin,
      renavam: this.renavam,
      insuranceClaimNumber: this.insuranceClaimNumber,
      brand: this.brand,
      model: this.model,
      color: this.color,
      notes: this.notes,
    };

    console.log('Veículo cadastrado!', payload);
  }
}

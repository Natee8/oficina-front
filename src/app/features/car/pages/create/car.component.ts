import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { Router } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneCarComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoCarComponent } from '../../components/steps/two/stepTwo.component';
import { ClientService } from '../../../clients/service/client.service';
import { CreateVehiclePayload, VehicleService } from '../../service/car.service';

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

export class CreateCarComponent implements OnInit {
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

  cliente: number | null = null;
  plate = '';
  year: number | null = null;
  vin = '';
  renavam = '';
  insuranceClaimNumber = '';
  brand = '';
  model = '';
  color = '';
  notes = '';

  clientes: Array<{ label: string; value: number }> = [];
  error = '';

  constructor(
    private router: Router,
    private clientService: ClientService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.clientService.getCustomers().subscribe({
      next: (customers) => {
        this.clientes = customers.map((customer) => ({
          label: customer.name,
          value: customer.id,
        }));
      },
      error: () => {
        this.clientes = [];
      },
    });
  }

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

  private parseYear(value: number | string | null): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  submit() {
    if (!this.cliente) {
      this.error = 'Selecione um cliente';
      return;
    }

    const payload: CreateVehiclePayload = {
      customerId: this.cliente,
      plate: this.plate,
      year: this.parseYear(this.year),
      vin: this.vin,
      renavam: this.renavam,
      insuranceClaimNumber: this.insuranceClaimNumber,
      brand: this.brand,
      model: this.model,
      color: this.color,
      notes: this.notes,
    };

    this.vehicleService.postVehicle(payload).subscribe({
      next: () => {
        this.router.navigate(['/car-list']);
      },
      error: () => {
        this.error = 'Erro ao cadastrar veículo';
      },
    });
  }
}

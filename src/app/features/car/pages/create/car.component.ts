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
import { stepsConfigCreateCar } from '../../../../core/config/stepsCreate.config';
import { CarData, createCarData } from '../../model/vehicle.data';
import { stepOneSchema } from '../../schemas/stepOne.schema';
import { stepTwoSchema } from '../../schemas/stepTwo.schema';

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

  steps = stepsConfigCreateCar;

  carData: CarData = createCarData();
  errors: Record<string, string> = {};

  clientes: Array<{ label: string; value: number }> = [];
  error = '';

  constructor(
    private router: Router,
    private clientService: ClientService,
    private vehicleService: VehicleService,
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

  async validateStep() {
    try {
      this.errors = {};

      if (this.stepIndex === 0) {
        await stepOneSchema.validate(this.carData, { abortEarly: false });
      }

      if (this.stepIndex === 1) {
        await stepTwoSchema.validate(this.carData, { abortEarly: false });
      }

      return true;
    } catch (err: any) {
      err.inner.forEach((e: any) => {
        this.errors[e.path] = e.message;
      });

      return false;
    }
  }

  async nextStep() {
    const isValid = await this.validateStep();

    if (!isValid) return;

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
    if (!this.carData.cliente) {
      this.error = 'Selecione um cliente';
      return;
    }

    const payload: CreateVehiclePayload = {
      customerId: this.carData.cliente!,
      plate: this.carData.plate,
      year: this.parseYear(this.carData.year),
      vin: this.carData.vin,
      renavam: this.carData.renavam,
      insuranceClaimNumber: this.carData.insuranceClaimNumber,
      brand: this.carData.brand,
      model: this.carData.model,
      color: this.carData.color,
      notes: this.carData.notes,
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { Router } from '@angular/router';
import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { StepOneCarComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoCarComponent } from '../../components/steps/two/stepTwo.component';
import { ClientService } from '../../../clients/service/client.service';
import { VehicleService } from '../../service/car.service';
import { stepsConfigCreateCar } from '../../../../core/config/stepsCreate.config';
import { CarData, createCarData } from '../../model/dtos/vehicle.data';
import { stepOneSchema } from '../../schemas/stepOne.schema';
import { stepTwoSchema } from '../../schemas/stepTwo.schema';
import { buildVehiclePayload } from '../../shared/payloadFunction';

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

  submit() {
    try {
      const payload = buildVehiclePayload(this.carData);

      this.vehicleService.postVehicle(payload).subscribe({
        next: () => {
          this.router.navigate(['/car-list']);
        },
        error: () => {
          this.error = 'Erro ao cadastrar veículo';
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        this.error = err.message; // ex: 'Cliente não pode ser nulo'
      }
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as yup from 'yup';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { StepOneCarComponent } from '../steps/one/stepOne.component';
import { StepTwoCarComponent } from '../steps/two/stepTwo.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { stepsConfigCar } from '../../../../core/config/stepsPopup.config';
import { ClientService } from '../../../clients/service/client.service';
import { VehicleService } from '../../service/car.service';
import { VehicleDto } from '../../model/dtos/vehicle.dto';
import { CarData, createCarData } from '../../model/dtos/vehicle.data';
import { reviewCarConfig } from '../../../../core/config/reviewsData';
import { stepOneSchema } from '../../schemas/stepOne.schema';
import { stepTwoSchema } from '../../schemas/stepTwo.schema';
import { buildVehiclePayload } from '../../shared/payloadFunction';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

@Component({
  selector: 'app-edit-car-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    StepperComponent,
    StepOneCarComponent,
    StepTwoCarComponent,
    ToggleActionsComponent,
    ReviewStepComponent,
  ],
  templateUrl: './popupEdit.component.html',
  styleUrls: ['./popupEdit.component.scss'],
})
export class EditCarModalComponent implements OnInit {
  stepIndex = 0;

  carData: CarData = createCarData();
  errors: Record<string, string> = {};

  clientes: Array<{ label: string; value: number }> = [];
  error = '';

  @Input() car: VehicleDto | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() vehicleUpdated = new EventEmitter<VehicleDto>();

  stepsConfig = stepsConfigCar;

  constructor(
    private clientService: ClientService,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadClients();

    if (this.car) {
      this.carData = {
        cliente: this.car.customerId,
        plate: this.car.plate,
        year: this.car.year,
        vin: this.car.vin,
        renavam: this.car.renavam,
        insuranceClaimNumber: this.car.insuranceClaimNumber,
        brand: this.car.brand,
        model: this.car.model,
        color: this.car.color,
        notes: this.car.notes,
      };
    }
  }

  private loadClients() {
    this.clientService.getCustomers().subscribe({
      next: (customers) => {
        this.clientes = customers.map((c) => ({ label: c.name, value: c.id }));
      },
      error: () => {
        this.clientes =
          this.car?.customerName && this.car?.customerId
            ? [{ label: this.car.customerName, value: this.car.customerId }]
            : [];
      },
    });
  }

  private validateStep(): boolean {
    this.errors = {};

    let schema: yup.ObjectSchema<any>;
    if (this.stepIndex === 0) schema = stepOneSchema;
    else if (this.stepIndex === 1) schema = stepTwoSchema;
    else return true;

    try {
      schema.validateSync(this.carData, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((e) => {
          if (e.path) this.errors[e.path] = e.message;
        });
      }
      return false;
    }
  }

  get clienteLabel() {
    return (
      this.clientes.find((c) => c.value === this.carData.cliente)?.label ??
      this.car?.customerName ??
      ''
    );
  }

  setStep(index: number) {
    this.stepIndex = index;
  }

  get isLastStep() {
    return this.stepIndex === this.stepsConfig.length - 1;
  }

  next() {
    if (this.stepIndex < this.stepsConfig.length - 1) this.stepIndex++;
  }
  back() {
    if (this.stepIndex > 0) this.stepIndex--;
  }

  handleNext() {
    if (!this.validateStep()) return;

    if (this.isLastStep) this.save();
    else this.next();
  }

  handleBack() {
    if (this.stepIndex === 0) this.close();
    else this.back();
  }

  save() {
    if (!this.car?.id) {
      this.error = 'Veículo inválido para atualização';
      this.snackBar.open(this.error, 'Fechar', snackBarErrorConfig);
      return;
    }

    try {
      const payload = buildVehiclePayload(this.carData);

      this.vehicleService.patchVehicle(this.car.id, payload).subscribe({
        next: (vehicle) => {
          this.snackBar.open('Veiculo atualizado com sucesso!', 'Fechar', snackBarSuccessConfig);
          this.vehicleUpdated.emit(vehicle);
          this.close();
        },
        error: (err) => {
          this.error = err?.error?.message || 'Erro ao atualizar veículo';
          this.snackBar.open(this.error, 'Fechar', snackBarErrorConfig);
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        this.error = err.message;
        this.snackBar.open(this.error, 'Fechar', snackBarErrorConfig);
      }
    }
  }

  close() {
    this.closeModalEvent.emit();
  }

  get reviewData() {
    return reviewCarConfig.map((section) => ({
      ...section,
      fields: section.fields.map((f) => ({
        ...f,
        value: this.carData[f.key as keyof CarData],
      })),
    }));
  }
}

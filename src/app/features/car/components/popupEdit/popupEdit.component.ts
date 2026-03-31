import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { StepOneCarComponent } from '../steps/one/stepOne.component';
import { StepTwoCarComponent } from '../steps/two/stepTwo.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { stepsConfigCar } from '../../../../core/config/stepsLabel.config';
import { ClientService } from '../../../clients/service/client.service';
import { CreateVehiclePayload, VehicleService } from '../../service/car.service';
import { VehicleDto } from '../../model/vehicle.dto';

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

  cliente: number | null = null;
  plate = '';
  year: number | null = null;
  vin = '';
  renavam = '';
  insuranceClaimNumber = '';
  clientes: Array<{ label: string; value: number }> = [];

  brand = '';
  model = '';
  color = '';
  notes = '';
  error = '';

  @Input() car: VehicleDto | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() vehicleUpdated = new EventEmitter<VehicleDto>();

  stepsConfig = stepsConfigCar;

  constructor(
    private clientService: ClientService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.loadClients();

    if (this.car) {
      this.cliente = this.car.customerId;
      this.plate = this.car.plate;
      this.year = this.car.year;
      this.vin = this.car.vin;
      this.renavam = this.car.renavam;
      this.insuranceClaimNumber = this.car.insuranceClaimNumber;

      this.brand = this.car.brand;
      this.model = this.car.model;
      this.color = this.car.color;
      this.notes = this.car.notes;

    }
  }

  private loadClients() {
    this.clientService.getCustomers().subscribe({
      next: (customers) => {
        this.clientes = customers.map((customer) => ({
          label: customer.name,
          value: customer.id,
        }));
      },
      error: () => {
        this.clientes = this.car?.customerName && this.car?.customerId
          ? [{ label: this.car.customerName, value: this.car.customerId }]
          : [];
      },
    });
  }

  get clienteLabel() {
    return this.clientes.find((client) => client.value === this.cliente)?.label ?? this.car?.customerName ?? '';
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
    if (this.isLastStep) this.save();
    else this.next();
  }

  handleBack() {
    if (this.stepIndex === 0) this.close();
    else this.back();
  }

  private parseYear(value: number | string | null): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  save() {
    if (!this.car?.id) {
      this.error = 'Veículo inválido para atualização';
      return;
    }

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

    this.vehicleService.patchVehicle(this.car.id, payload).subscribe({
      next: (vehicle) => {
        this.vehicleUpdated.emit(vehicle);
        this.close();
      },
      error: () => {
        this.error = 'Erro ao atualizar veículo';
      },
    });
  }

  close() {
    this.closeModalEvent.emit();
  }

  get reviewData() {
    return [
      {
        title: 'Dados do veículo',
        fields: [
          { label: 'Cliente', value: this.clienteLabel },
          { label: 'Placa', value: this.plate },
          { label: 'Ano', value: this.year },
          { label: 'VIN', value: this.vin },
          { label: 'Renavam', value: this.renavam },
          { label: 'Sinistro', value: this.insuranceClaimNumber },
        ],
      },
      {
        title: 'Informações adicionais',
        fields: [
          { label: 'Marca', value: this.brand },
          { label: 'Modelo', value: this.model },
          { label: 'Cor', value: this.color },
          { label: 'Observações', value: this.notes },
        ],
      },
    ];
  }
}

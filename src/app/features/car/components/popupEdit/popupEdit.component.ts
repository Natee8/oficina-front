import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { StepOneCarComponent } from '../steps/one/stepOne.component';
import { StepTwoCarComponent } from '../steps/two/stepTwo.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';

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
export class EditCarModalComponent {
  stepIndex = 0;

  cliente = '';
  plate = '';
  year: number | null = null;
  vin = '';
  renavam = '';
  insuranceClaimNumber = '';
  clientes: string[] = [];

  brand = '';
  model = '';
  color = '';
  notes = '';

  @Input() car: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  stepsConfig = [
    { icon: 'fa-solid fa-car', title: 'Step 1/2', subtitle: 'Dados do veículo' },
    { icon: 'fa-solid fa-info', title: 'Step 2/2', subtitle: 'Informações adicionais' },
    {
      icon: 'fa-solid fa-flag-checkered',
      title: 'Step 3/3',
      subtitle: 'Finalizar',
    },
  ];

  ngOnInit() {
    if (this.car) {
      this.cliente = this.car.cliente;
      this.plate = this.car.plate;
      this.year = this.car.year;
      this.vin = this.car.vin;
      this.renavam = this.car.renavam;
      this.insuranceClaimNumber = this.car.insuranceClaimNumber;

      this.brand = this.car.brand;
      this.model = this.car.model;
      this.color = this.car.color;
      this.notes = this.car.notes;

      this.clientes = this.car.clientes || [];
    }
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

  save() {
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
    console.log('EDIT CAR', payload);
  }

  close() {
    this.closeModalEvent.emit();
  }

  get reviewData() {
    return [
      {
        title: 'Dados do veículo',
        fields: [
          { label: 'Cliente', value: this.cliente },
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

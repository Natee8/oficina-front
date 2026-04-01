import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { StepOneClientComponent } from '../steps/one/stepOne.component';
import { StepTwoClientComponent } from '../steps/two/stepTwo.component';
import { StepThreeClientComponent } from '../steps/three/stepThree.component';
import { stepsConfigClient } from '../../../../core/config/stepsPopup.config';
import { ClientData, createClientData } from '../../model/dtos/client.data';
import { reviewClientConfig } from '../../../../core/config/reviewsData';
import { stepThreeClientSchema } from '../../schemas/stepThree.schema';
import { stepTwoClientSchema } from '../../schemas/stepTwo.schema';
import { stepOneClientSchema } from '../../schemas/stepOne.schema';

@Component({
  selector: 'app-edit-client-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    StepperComponent,
    StepOneClientComponent,
    StepTwoClientComponent,
    StepThreeClientComponent,
    ReviewStepComponent,
    ToggleActionsComponent,
  ],
  templateUrl: './popupEdit.component.html',
  styleUrls: ['./popupEdit.component.scss'],
})
export class EditClientModalComponent {
  stepIndex = 0;

  clientData: ClientData = createClientData();
  errors: Record<string, string> = {};

  lojas: { label: string; value: number }[] = [];
  tiposLegais: { label: string; value: number }[] = [
    { label: 'Cliente Físico', value: 1 },
    { label: 'Cliente Empresa', value: 2 },
  ];

  loja!: number;
  tipoLegal!: number;

  @Input() client: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  stepsConfig = stepsConfigClient;

  ngOnInit() {
    if (this.client) {
      this.clientData = {
        nome: this.client.nome,
        cpfCnpj: this.client.cpfCnpj,
        email: this.client.email,
        phone: this.client.phone,

        addressZip: this.client.addressZip,
        addressStreet: this.client.addressStreet,
        addressNumber: this.client.addressNumber,
        addressDistrict: this.client.addressDistrict,
        addressCity: this.client.addressCity,
        addressState: this.client.addressState,

        loja: this.client.loja ?? null,
        tipoLegal: this.client.tipoLegal ?? null,
        notes: this.client.notes,
      };
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

  async handleNext() {
    this.errors = {};

    let schema;
    let values = {};

    if (this.stepIndex === 0) {
      schema = stepOneClientSchema;
      values = {
        nome: this.clientData.nome,
        cpfCnpj: this.clientData.cpfCnpj.replace(/\D/g, ''),
        phone: this.clientData.phone.replace(/\D/g, ''),
        email: this.clientData.email,
      };
    } else if (this.stepIndex === 1) {
      schema = stepTwoClientSchema;
      values = {
        addressZip: this.clientData.addressZip,
        addressNumber: this.clientData.addressNumber,
        addressStreet: this.clientData.addressStreet,
        addressDistrict: this.clientData.addressDistrict,
        addressCity: this.clientData.addressCity,
        addressState: this.clientData.addressState,
      };
    } else if (this.stepIndex === 2) {
      schema = stepThreeClientSchema;
      values = {
        loja: this.clientData.loja,
        tipoLegal: this.clientData.tipoLegal,
      };
    }

    if (!schema) return;

    try {
      await schema.validate(values, { abortEarly: false });

      if (this.isLastStep) {
        this.save();
      } else {
        this.next();
      }
    } catch (err: any) {
      this.errors = {};
      err.inner.forEach((e: any) => {
        if (e.path) this.errors[e.path] = e.message;
      });
    }
  }

  handleBack() {
    if (this.stepIndex === 0) this.close();
    else this.back();
  }

  save() {
    const payload = {
      nome: this.clientData.nome,
      cpfCnpj: this.clientData.cpfCnpj,
      email: this.clientData.email,
      phone: this.clientData.phone,
      addressZip: this.clientData.addressZip,
      addressStreet: this.clientData.addressStreet,
      addressNumber: this.clientData.addressNumber,
      addressDistrict: this.clientData.addressDistrict,
      addressCity: this.clientData.addressCity,
      addressState: this.clientData.addressState,
      loja: this.clientData.loja,
      tipoLegal: this.clientData.tipoLegal,
      notes: this.clientData.notes,
    };

    console.log('EDIT CLIENT', payload);
  }

  close() {
    this.closeModalEvent.emit();
  }

  get reviewData() {
    return reviewClientConfig.map((section) => ({
      title: section.title,
      fields: section.fields.map((field) => ({
        label: field.label,
        value: this.clientData[field.key as keyof ClientData],
      })),
    }));
  }
}

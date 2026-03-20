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
import { stepsConfigClient } from '../../../../core/config/stepsLabel.config';

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

  loja = '';
  tipoLegal = '';
  notes = '';

  lojas: string[] = ['Loja 1', 'Loja 2'];
  tiposLegais: string[] = ['Pessoa Física', 'Pessoa Jurídica'];

  @Input() client: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  stepsConfig = stepsConfigClient;

  ngOnInit() {
    if (this.client) {
      this.nome = this.client.nome;
      this.cpfCnpj = this.client.cpfCnpj;
      this.email = this.client.email;
      this.phone = this.client.phone;

      this.addressZip = this.client.addressZip;
      this.addressStreet = this.client.addressStreet;
      this.addressNumber = this.client.addressNumber;
      this.addressDistrict = this.client.addressDistrict;
      this.addressCity = this.client.addressCity;
      this.addressState = this.client.addressState;

      this.loja = this.client.loja;
      this.tipoLegal = this.client.tipoLegal;
      this.notes = this.client.notes;
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

    console.log('EDIT CLIENT', payload);
  }

  close() {
    this.closeModalEvent.emit();
  }

  get reviewData() {
    return [
      {
        title: 'Dados pessoais',
        fields: [
          { label: 'Nome', value: this.nome },
          { label: 'CPF/CNPJ', value: this.cpfCnpj },
          { label: 'Email', value: this.email },
          { label: 'Telefone', value: this.phone },
        ],
      },
      {
        title: 'Endereço',
        fields: [
          { label: 'CEP', value: this.addressZip },
          { label: 'Rua', value: this.addressStreet },
          { label: 'Número', value: this.addressNumber },
          { label: 'Bairro', value: this.addressDistrict },
          { label: 'Cidade', value: this.addressCity },
          { label: 'Estado', value: this.addressState },
        ],
      },
      {
        title: 'Informações adicionais',
        fields: [
          { label: 'Loja', value: this.loja },
          { label: 'Tipo Legal', value: this.tipoLegal },
          { label: 'Observações', value: this.notes },
        ],
      },
    ];
  }
}

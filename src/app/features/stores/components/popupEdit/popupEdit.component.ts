import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';

import { StepOneStoresComponent } from '../steps/one/stepOne.component';
import { StepTwoStoresComponent } from '../steps/two/stepTwo.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

@Component({
  selector: 'app-edit-store-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    StepperComponent,
    StepOneStoresComponent,
    StepTwoStoresComponent,
    ReviewStepComponent,
    ToggleActionsComponent,
  ],
  templateUrl: './popupEdit.component.html',
  styleUrls: ['./popupEdit.component.scss'],
})
export class EditStoreModalComponent {
  stepIndex = 0;

  name = '';
  cnpj = '';

  addressZip = '';
  addressStreet = '';
  addressNumber = '';
  addressDistrict = '';
  addressCity = '';
  addressState = '';

  closeModal = false;

  stepsConfig = [
    {
      icon: 'fa-solid fa-user',
      title: 'Step 1/3',
      subtitle: 'Informações',
    },
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Step 2/3',
      subtitle: 'Endereço',
    },
    {
      icon: 'fa-solid fa-flag-checkered',
      title: 'Step 3/3',
      subtitle: 'Finalizar',
    },
  ];

  get reviewData() {
    return [
      {
        title: 'Informações da Loja',
        fields: [
          { label: 'Nome', value: this.name },
          { label: 'CNPJ', value: this.cnpj },
        ],
      },
      {
        title: 'Endereço',
        fields: [
          { label: 'CEP', value: this.addressZip },
          { label: 'Número', value: this.addressNumber },
          { label: 'Rua', value: this.addressStreet },
          { label: 'Bairro', value: this.addressDistrict },
          { label: 'Cidade', value: this.addressCity },
          { label: 'Estado', value: this.addressState },
        ],
      },
    ];
  }

  @Input() store: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  ngOnInit() {
    if (this.store) {
      this.name = this.store.name;
      this.cnpj = this.store.cnpj;

      this.addressZip = this.store.zip;
      this.addressStreet = this.store.street;
      this.addressNumber = this.store.number;
      this.addressDistrict = this.store.neighborhood;
      this.addressCity = this.store.city;
      this.addressState = this.store.state;
    }
  }

  setStep(index: number) {
    this.stepIndex = index;
  }

  get isLastStep() {
    return this.stepIndex === this.stepsConfig.length - 1;
  }

  next() {
    if (this.stepIndex < this.stepsConfig.length - 1) {
      this.stepIndex++;
    }
  }

  back() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    }
  }

  handleNext() {
    if (this.isLastStep) {
      this.save();
    } else {
      this.next();
    }
  }

  handleBack() {
    if (this.stepIndex === 0) {
      this.close();
      return;
    }

    this.back();
  }

  save() {
    const payload = {
      name: this.name,
      cnpj: this.cnpj,
      addressZip: this.addressZip,
      addressStreet: this.addressStreet,
      addressNumber: this.addressNumber,
      addressDistrict: this.addressDistrict,
      addressCity: this.addressCity,
      addressState: this.addressState,
    };

    console.log('EDIT STORE', payload);
  }

  close() {
    this.closeModalEvent.emit();
  }
}

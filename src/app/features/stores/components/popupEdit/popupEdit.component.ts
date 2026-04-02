import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';

import { StepOneStoresComponent } from '../steps/one/stepOne.component';
import { StepTwoStoresComponent } from '../steps/two/stepTwo.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';
import { stepsConfigStore } from '../../../../core/config/stepsPopup.config';
import { createStoreData } from '../../model/store.data';
import { stepOneSchema } from '../../schemas/stepOne.schema';
import { stepTwoSchema } from '../../schemas/stepTwo.schema';
import { reviewStoreConfig } from '../../../../core/config/reviewsData';
import { buildStorePayload } from '../../shared/functionPayload';
import { StoreService } from '../../service/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

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
  storeData = createStoreData();
  errors: Record<string, string> = {};
  reviewData = reviewStoreConfig;

  closeModal = false;

  stepsConfig = stepsConfigStore;

  constructor(
    private storeService: StoreService,
    private snackBar: MatSnackBar,
  ) {}

  get formattedReviewData() {
    return this.reviewData.map((section) => ({
      title: section.title,
      fields: section.fields.map((field) => ({
        label: field.label,
        value: (this.storeData as any)[field.key] ?? '',
      })),
    }));
  }

  @Input() store: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.store) {
      this.storeData.name = this.store.name;
      this.storeData.cnpj = this.store.cnpj;
      this.storeData.phone = this.store.phone ?? '';
      this.storeData.email = this.store.email ?? '';

      this.storeData.addressZip = this.store.addressZip ?? this.store.zip ?? '';
      this.storeData.addressStreet = this.store.addressStreet ?? this.store.street ?? '';
      this.storeData.addressNumber = this.store.addressNumber ?? this.store.number ?? '';
      this.storeData.addressDistrict = this.store.addressDistrict ?? this.store.neighborhood ?? '';
      this.storeData.addressCity = this.store.addressCity ?? this.store.city ?? '';
      this.storeData.addressState = this.store.addressState ?? this.store.state ?? '';
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

  async handleNext() {
    try {
      this.errors = {};

      const schemas = [stepOneSchema, stepTwoSchema];

      // só valida steps que têm form
      if (this.stepIndex < 2) {
        await schemas[this.stepIndex].validate(this.storeData, {
          abortEarly: false,
        });
      }

      if (this.isLastStep) {
        this.save();
      } else {
        this.next();
      }
    } catch (err: any) {
      this.errors = {};

      err.inner.forEach((e: any) => {
        this.errors[e.path] = e.message;
      });
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
    if (!this.store?.id) {
      this.snackBar.open('Loja inválida para atualização.', 'Fechar', snackBarErrorConfig);
      return;
    }

    const payload = buildStorePayload(this.storeData);

    this.storeService.updateStore(this.store.id, payload).subscribe({
      next: () => {
        this.snackBar.open('Loja atualizada com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.close(true);
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Erro ao atualizar a loja.', 'Fechar', snackBarErrorConfig);
      },
    });
  }

  close(updated = false) {
    this.closeModalEvent.emit(updated);
  }
}

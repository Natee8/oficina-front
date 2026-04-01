import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterCardComponent } from '../../../../layout/CardCreateLayout/register-card.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';

import { StepOneStoresComponent } from '../../components/steps/one/stepOne.component';
import { StepTwoStoresComponent } from '../../components/steps/two/stepTwo.component';
import { stepOneSchema } from '../../schemas/stepOne.schema';
import { stepTwoSchema } from '../../schemas/stepTwo.schema';
import { createStoreData } from '../../model/store.data';
import { StoreService } from '../../service/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stepsConfigCreateStores } from '../../../../core/config/stepsCreate.config';

@Component({
  selector: 'app-create-store',
  standalone: true,
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RegisterCardComponent,
    BackButtonComponent,
    StepOneStoresComponent,
    StepTwoStoresComponent,
  ],
})
export class CreateStoreComponent {
  stepIndex = 0;
  errors: Record<string, string> = {};

  steps = stepsConfigCreateStores;

  storeData = createStoreData();

  constructor(
    private router: Router,
    private storeService: StoreService,
    private snackBar: MatSnackBar,
  ) {}

  async nextStep() {
    try {
      this.errors = {};

      if (this.stepIndex === 0) {
        await stepOneSchema.validate(this.storeData, { abortEarly: false });
      }

      if (this.stepIndex === 1) {
        await stepTwoSchema.validate(this.storeData, { abortEarly: false });
      }

      if (this.stepIndex < 1) {
        this.stepIndex++;
      } else {
        this.finish();
      }
    } catch (err: any) {
      this.errors = {};

      err.inner.forEach((e: any) => {
        this.errors[e.path] = e.message;
      });
    }
  }

  previousStep() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    }
  }

  goBackList() {
    this.router.navigate(['/stores-list']);
  }

  finish() {
    const payload = { ...this.storeData };

    this.storeService.createStore(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Loja cadastrada com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        console.log('Loja cadastrada!', res);
        this.router.navigate(['/stores-list']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar a loja', err);

        this.snackBar.open(err?.error?.message || 'Erro ao cadastrar a loja', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}

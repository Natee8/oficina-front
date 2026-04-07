import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
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
import { buildClientPayload } from '../../shared/functionCreatePayload';
import { ClientService } from '../../service/client.service';
import { ClientDto } from '../../model/dtos/client.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

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
export class EditClientModalComponent implements OnInit {
  stepIndex = 0;

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar,
  ) {}

  clientData: ClientData = createClientData();
  errors: Record<string, string> = {};

  lojas: { label: string; value: number }[] = [];
  tiposLegais: { label: string; value: number }[] = [
    { label: 'Cliente Físico', value: 1 },
    { label: 'Cliente Empresa', value: 2 },
  ];

  @Input() client!: ClientDto;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() clientUpdated = new EventEmitter<void>();

  stepsConfig = stepsConfigClient;

  ngOnInit(): void {
    this.loadLojas();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['client']) {
      const currentClient = changes['client'].currentValue;

      this.clientData = createClientData();
  
      if (currentClient) {
        this.clientData = {
          ...this.clientData,

          nome: currentClient.name,
          cpfCnpj: currentClient.cpfCnpj,
          email: currentClient.email,
          phone: currentClient.phone,

          addressZip: currentClient.addressZip,
          addressStreet: currentClient.addressStreet,
          addressNumber: currentClient.addressNumber,
          addressDistrict: currentClient.addressDistrict,
          addressCity: currentClient.addressCity,
          addressState: currentClient.addressState,

          loja: [...(currentClient.unitIds ?? [])],
          tipoLegal: currentClient.legalTypeId ?? null,
          notes: currentClient.notes ?? '',
        };
      }
    }
  }

  private loadLojas() {
    this.clientService.getLojas().subscribe({
      next: (lojas) => {
        this.lojas = lojas.map((l) => ({
          label: l.name,
          value: l.id,
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar lojas', err);
      },
    });
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
    if (!this.client?.id) {
      this.snackBar.open('Cliente inválido para atualização.', 'Fechar', snackBarErrorConfig);
      return;
    }

    try {
      const payload = buildClientPayload({
        ...this.clientData,
        loja: [...this.clientData.loja],
      });

      this.clientService.updateClient(this.client.id, payload).subscribe({
        next: () => {
          this.clientUpdated.emit();
          this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', snackBarSuccessConfig);
          this.close();
        },
        error: (err) => {
          this.snackBar.open(this.getErrorMessage(err), 'Fechar', snackBarErrorConfig);
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        this.snackBar.open(err.message, 'Fechar', snackBarErrorConfig);
      }
    }
  }
  close() {
    this.clientData = createClientData();
    this.stepIndex = 0;
    this.errors = {};

    this.closeModalEvent.emit();
  }

  get reviewData() {
    return reviewClientConfig.map((section) => ({
      title: section.title,
      fields: section.fields.map((field) => ({
        label: field.label,
        value: field.key === 'loja'
          ? this.getSelectedStoreLabels()
          : this.clientData[field.key as keyof ClientData],
      })),
    }));
  }

  private getSelectedStoreLabels(): string {
    if (!this.clientData.loja.length) {
      return '-';
    }

    return this.lojas
      .filter((store) => this.clientData.loja.includes(store.value))
      .map((store) => store.label)
      .join(', ');
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'string' && error.trim()) {
      return error.trim();
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string; errors?: Record<string, string[]> } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        return apiError.error.trim();
      }

      if (apiError.error && typeof apiError.error === 'object') {
        if (apiError.error.message?.trim()) {
          return apiError.error.message.trim();
        }

        const validationMessage = Object.values(apiError.error.errors ?? {})
          .flat()
          .find((message) => message?.trim());

        if (validationMessage) {
          return validationMessage;
        }
      }

      if (apiError.message?.trim()) {
        return apiError.message.trim();
      }
    }

    return 'Erro ao atualizar cliente.';
  }
}

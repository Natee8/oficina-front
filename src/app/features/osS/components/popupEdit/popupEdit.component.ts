import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { OsStepOneComponent } from '../steps/one/stepOne.component';
import { OsStepTwoComponent } from '../steps/two/stepTwo.component';
import { stepsConfigOs } from '../../../../core/config/stepsPopup.config';
import { OsService } from '../../service/os.service';
import { OsDto } from '../../model/dtos/os.dto';
import { StoreService } from '../../../stores/service/store.service';
import { StoreDto } from '../../../stores/model/store.dto';
import { ClientService } from '../../../clients/service/client.service';
import { ClientDto } from '../../../clients/model/dtos/client.dto';
import { VehicleService } from '../../../car/service/car.service';
import { VehicleDto } from '../../../car/model/dtos/vehicle.dto';
import { OsData, createOsData } from '../../model/dtos/os.data';
import { StepOneOsSchema } from '../../schemas/stepOne.schema';
import { reviewOsConfig } from '../../../../core/config/reviewsData';
import { buildUpdateOsPayload } from '../../shared/functionPayloadUpdate';
import { getOsErrorMessage } from '../../shared/getOsErrorMessage';
import {
  snackBarErrorConfig,
  snackBarSuccessConfig,
} from '../../../../core/config/snackbar.config';

@Component({
  selector: 'app-edit-os-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    StepperComponent,
    OsStepOneComponent,
    OsStepTwoComponent,
    ReviewStepComponent,
    ToggleActionsComponent,
  ],
  templateUrl: './popupEdit.component.html',
  styleUrls: ['./popupEdit.component.scss'],
})
export class EditOsModalComponent implements OnInit {
  stepIndex = 0;

  osData: OsData = createOsData();

  lojas: StoreDto[] = [];
  clientes: ClientDto[] = [];
  veiculos: VehicleDto[] = [];

  stepsConfig = stepsConfigOs;
  reviewData = reviewOsConfig;

  stepOneErrors: Record<string, string> = {};
  stepTwoErrors: Record<string, string> = {};

  @Input() os: OsDto | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();

  pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[] = [];

  constructor(
    private osService: OsService,
    private storeService: StoreService,
    private clientService: ClientService,
    private vehicleService: VehicleService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadLookupData();

    if (this.os) {
      this.populateFromOs(this.os);
    }
  }

  private loadLookupData() {
    this.storeService.getStores().subscribe((stores) => (this.lojas = stores));
    this.clientService.getCustomers().subscribe((customers) => (this.clientes = customers));
    this.vehicleService.getVehicles().subscribe((vehicles) => (this.veiculos = vehicles));
  }

  private populateFromOs(os: OsDto) {
    this.osData = {
      loja: os.unitId,
      cliente: os.ownerCustomerId,
      veiculo: os.vehicleId,
      dataEntrada: os.entryDate ? os.entryDate.split('T')[0] : '',
      dataSaida: os.estimatedDeliveryDate ? os.estimatedDeliveryDate.split('T')[0] : '',
      pintura: os.paintDescription ?? '',
      valorPintura: os.paintValue ? String(os.paintValue) : '',
      funilaria: os.bodyworkDescription ?? '',
      valorFunilaria: os.bodyworkValue ? String(os.bodyworkValue) : '',
      mecanica: os.mechanicsDescription ?? '',
      valorMecanica: os.mechanicsValue ? String(os.mechanicsValue) : '',
      peca: '',
      quantidade: null,
      valorUnitario: '',
    };

    this.pecasAdicionadas = (os.parts || []).map((part) => ({
      nome: part.description,
      quantidade: part.quantity,
      valorUnitario: part.unitPrice,
    }));
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
      this.stepOneErrors = {};

      if (this.stepIndex === 0) {
        const dataToValidate = {
          ...this.osData,
          hasParts: this.pecasAdicionadas.length > 0,
        };

        await StepOneOsSchema.validate(dataToValidate, {
          abortEarly: false,
        });
      }

      if (this.isLastStep) {
        this.save();
      } else {
        this.next();
      }
    } catch (err: any) {
      this.stepOneErrors = {};

      err.inner.forEach((e: any) => {
        this.stepOneErrors[e.path] = e.message;
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
    if (!this.os) return;

    const payload = buildUpdateOsPayload(this.osData, this.os, this.pecasAdicionadas);

    this.osService.patchServiceOrder(this.os.id, payload).subscribe({
      next: () => {
        this.snackBar.open('OS atualizada com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.router.navigate(['/os-list']);
        this.close();
      },
      error: (error) => {
        console.error('Error updating OS:', error);
        this.snackBar.open(getOsErrorMessage(error), 'Fechar', snackBarErrorConfig);
      },
    });
  }

  close() {
    this.closeModalEvent.emit();
  }

  adicionarPeca() {
    const valorUnitario = this.parseCurrency(this.osData.valorUnitario);

    if (!this.validatePartFields(valorUnitario)) {
      return;
    }

    this.pecasAdicionadas.push({
      nome: this.osData.peca.trim(),
      quantidade: Number(this.osData.quantidade),
      valorUnitario,
    });

    this.stepTwoErrors = {};
    this.osData.peca = '';
    this.osData.quantidade = null;
    this.osData.valorUnitario = '';
  }

  aumentarQtd(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    peca.quantidade++;
  }

  diminuirQtd(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    if (peca.quantidade > 1) peca.quantidade--;
  }

  removerPeca(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    this.pecasAdicionadas = this.pecasAdicionadas.filter((p) => p !== peca);
  }

  private validatePartFields(parsedUnitPrice: number): boolean {
    const nextErrors: Record<string, string> = {};
    const pieceName = this.osData.peca?.trim();
    const quantity = Number(this.osData.quantidade);

    if (!pieceName) {
      nextErrors['peca'] = 'Peça é obrigatória.';
    }

    if (!this.osData.quantidade) {
      nextErrors['quantidade'] = 'Quantidade é obrigatória.';
    } else if (!Number.isFinite(quantity) || quantity <= 0) {
      nextErrors['quantidade'] = 'Quantidade deve ser maior que zero.';
    }

    if (!this.osData.valorUnitario?.trim()) {
      nextErrors['valorUnitario'] = 'Valor unitário é obrigatório.';
    } else if (!Number.isFinite(parsedUnitPrice) || parsedUnitPrice <= 0) {
      nextErrors['valorUnitario'] = 'Valor unitário deve ser maior que zero.';
    }

    this.stepTwoErrors = nextErrors;
    return Object.keys(nextErrors).length === 0;
  }

  private parseCurrency(value: string | number | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

    const normalized = value.toString().trim().replace(/\./g, '').replace(',', '.');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private toIsoUtc(dateValue: string | null, hour: number): string {
    if (!dateValue) return '';
    return `${dateValue}T${String(hour).padStart(2, '0')}:00:00Z`;
  }

  get formattedReviewData() {
    return this.reviewData.map((section) => {
      if (section.dynamic) {
        return {
          title: section.title,
          fields: this.pecasAdicionadas
            .map((p) =>
              section.fields.map((f) => ({
                label: f.labelKey,
                value: f.format ? f.format(p) : (p as Record<string, string | number>)[f.valueKey],
              })),
            )
            .flat(),
        };
      }

      return {
        title: section.title,
        fields: section.fields.map((f) => {
          if ('label' in f && 'key' in f) {
            return {
              label: f.label,
              value:
                (this.osData as any)[f.key] != null
                  ? `${f.prefix || ''}${(this.osData as any)[f.key]}`
                  : '',
            };
          }

          return { label: '', value: '' };
        }),
      };
    });
  }
}

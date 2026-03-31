import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { OsStepOneComponent } from '../steps/one/stepOne.component';
import { OsStepTwoComponent } from '../steps/two/stepTwo.component';
import { stepsConfigOs } from '../../../../core/config/stepsLabel.config';
import { OsService, CreateOsPayload } from '../../service/os.service';
import { OsDto } from '../../model/dtos/os.dto';
import { StoreService } from '../../../stores/service/store.service';
import { StoreDto } from '../../../stores/model/store.dto';
import { ClientService } from '../../../clients/service/client.service';
import { ClientDto } from '../../../clients/model/client.dto';
import { VehicleService } from '../../../car/service/vehicle.service';
import { VehicleDto } from '../../../car/model/vehicle.dto';

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

  loja: number | null = null;
  cliente: number | null = null;
  veiculo: number | null = null;
  dataEntrada = '';
  dataSaida = '';
  pintura = '';
  valorPintura = '';
  funilaria = '';
  valorFunilaria = '';
  peca = '';
  quantidade: number | null = null;
  valorUnitario = '';
  pecasAdicionadas: any[] = [];

  lojas: StoreDto[] = [];
  clientes: ClientDto[] = [];
  veiculos: VehicleDto[] = [];

  stepsConfig = stepsConfigOs;

  @Input() os: OsDto | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(
    private osService: OsService,
    private storeService: StoreService,
    private clientService: ClientService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLookupData();

    if (this.os) {
      this.populateFromOs(this.os);
    }
  }

  private loadLookupData() {
    this.storeService.getStores().subscribe(stores => {
      this.lojas = stores;
    });

    this.clientService.getCustomers().subscribe(customers => {
      this.clientes = customers;
    });

    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.veiculos = vehicles;
    });
  }

  private populateFromOs(os: OsDto) {
    this.loja = os.unitId;
    this.cliente = os.ownerCustomerId;
    this.veiculo = os.vehicleId;
    this.dataEntrada = os.entryDate ? os.entryDate.split('T')[0] : '';
    this.dataSaida = os.estimatedDeliveryDate ? os.estimatedDeliveryDate.split('T')[0] : '';
    this.funilaria = os.bodyworkDescription;
    this.valorFunilaria = os.bodyworkValue ? String(os.bodyworkValue) : '';
    this.pintura = os.paintDescription;
    this.valorPintura = os.paintValue ? String(os.paintValue) : '';

    this.pecasAdicionadas = (os.parts || []).map(part => ({
      nome: part.description,
      quantidade: part.quantity,
      valor: String(part.unitPrice),
    }));
  }

  onLojaChange(lojaId: number | string | null) {
    const parsedLoja = lojaId === null || lojaId === '' ? null : Number(lojaId);
    this.loja = Number.isNaN(parsedLoja) ? null : parsedLoja;
    this.cliente = null;
    this.veiculo = null;

    if (!this.loja) {
      return;
    }

    this.clientService.getCustomers().subscribe({
      next: (customers) => {
        this.clientes = customers.filter(customer => customer.unitIds?.includes(this.loja as number));
      },
      error: () => {
        this.clientes = [];
      },
    });
  }

  onClienteChange(clienteId: number | string | null) {
    const parsedCliente = clienteId === null || clienteId === '' ? null : Number(clienteId);
    this.cliente = Number.isNaN(parsedCliente) ? null : parsedCliente;
    this.veiculo = null;

    if (!this.loja || !this.cliente) {
      return;
    }

    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.veiculos = vehicles.filter(vehicle => vehicle.customerId === this.cliente);
      },
      error: () => {
        this.veiculos = [];
      },
    });
  }

  private parseCurrency(value: string | number | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

    const normalized = value
      .toString()
      .trim()
      .replace(/\./g, '')
      .replace(',', '.');

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private toIsoUtc(dateValue: string | null, hour: number): string {
    if (!dateValue) return '';
    return `${dateValue}T${String(hour).padStart(2, '0')}:00:00Z`;
  }

  private formatCurrencyDisplay(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return 'R$ 0';
    }

    return `R$ ${value}`;
  }

  get reviewData() {
    return [
      {
        title: 'Informações da OS',
        fields: [
          { label: 'Loja', value: this.loja },
          { label: 'Cliente', value: this.cliente },
          { label: 'Veículo', value: this.veiculo },
          { label: 'Entrada', value: this.dataEntrada },
          { label: 'Saída', value: this.dataSaida },
        ],
      },
      {
        title: 'Serviços',
        fields: [
          { label: 'Pintura', value: this.pintura },
          { label: 'Valor Pintura', value: this.formatCurrencyDisplay(this.valorPintura) },
          { label: 'Funilaria', value: this.funilaria },
          { label: 'Valor Funilaria', value: this.formatCurrencyDisplay(this.valorFunilaria) },
        ],
      },
      {
        title: 'Peças',
        fields: this.pecasAdicionadas.map((p) => ({
          label: p.nome,
          value: `Qtd: ${p.quantidade} | R$ ${p.valor}`,
        })),
      },
    ];
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

  adicionarPeca() {
    if (!this.peca || !this.quantidade) return;

    this.pecasAdicionadas.push({
      nome: this.peca,
      quantidade: this.quantidade,
      valor: this.valorUnitario,
    });

    this.peca = '';
    this.quantidade = null;
    this.valorUnitario = '';
  }

  aumentarQtd(peca: any) {
    peca.quantidade++;
  }

  diminuirQtd(peca: any) {
    if (peca.quantidade > 1) peca.quantidade--;
  }

  removerPeca(peca: any) {
    this.pecasAdicionadas = this.pecasAdicionadas.filter((p) => p !== peca);
  }

  save() {
    if (!this.os) {
      console.error('No OS data to update');
      return;
    }

    const payload: CreateOsPayload = {
      unitId: this.loja ?? this.os.unitId,
      vehicleId: this.veiculo ?? this.os.vehicleId,
      ownerCustomerId: this.cliente ?? this.os.ownerCustomerId,
      entryDate: this.toIsoUtc(this.dataEntrada, 10),
      estimatedDeliveryDate: this.toIsoUtc(this.dataSaida, 18),
      bodyworkDescription: this.funilaria,
      bodyworkValue: this.parseCurrency(this.valorFunilaria),
      paintDescription: this.pintura,
      paintValue: this.parseCurrency(this.valorPintura),
      parts: this.pecasAdicionadas.map(p => ({
        description: p.nome,
        quantity: Number(p.quantidade),
        unitPrice: this.parseCurrency(p.valor)
      })),
    };

    this.osService.patchServiceOrder(this.os.id, {
      ...payload,
      statusId: this.os.statusId,
      deliveryDate: this.os.deliveryDate,
      totalDiscount: this.os.totalDiscount,
    }).subscribe({
      next: () => {
        this.router.navigate(['/os-list']);
        this.close();
      },
      error: (error) => {
        console.error('Error updating OS:', error);
      }
    });
  }

  close() {
    this.closeModalEvent.emit();
  }
}

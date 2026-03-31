import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OsStepOneComponent } from '../../components/steps/one/stepOne.component';
import { OsStepTwoComponent } from '../../components/steps/two/stepTwo.component';
import { Router } from '@angular/router';
import { OsService, CreateOsPayload } from '../../service/os.service';
import { StoreService } from '../../../stores/service/store.service';
import { StoreDto } from '../../../stores/model/store.dto';
import { ClientService } from '../../../clients/service/client.service';
import { ClientDto } from '../../../clients/model/client.dto';
import { VehicleDto } from '../../../car/model/vehicle.dto';
import { VehicleService } from '../../../car/service/car.service';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';

@Component({
  selector: 'app-os-create',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    OsStepOneComponent,
    OsStepTwoComponent,
    BackButtonComponent,
  ],
})
export class OSsCreateComponent implements OnInit {
  lojas: StoreDto[] = [];
  clientes: ClientDto[] = [];
  veiculos: VehicleDto[] = [];

  pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[] = [];

  loja: number | null = null;
  cliente: number | null = null;
  veiculo: number | null = null;
  dataEntrada: string = '';
  dataSaida: string = '';
  pintura: string = '';
  funilaria: string = '';
  valorPintura: string = '';
  valorFunilaria: string = '';

  peca: string = '';
  quantidade: number | null = null;
  valorUnitario: string = '';

  stepAtual = 1;
  stepTotal = 2;

  constructor(
    private router: Router,
    private osService: OsService,
    private storeService: StoreService,
    private clientService: ClientService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.storeService.getStores().subscribe(lojas => {
      this.lojas = lojas;
    });
  }

  onLojaChange(lojaId: number | string | null) {
    const parsedLoja = lojaId === null || lojaId === '' ? null : Number(lojaId);
    this.loja = Number.isNaN(parsedLoja) ? null : parsedLoja;
    this.cliente = null;
    this.veiculo = null;
    this.clientes = [];
    this.veiculos = [];

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
    this.veiculos = [];

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

  private toIsoUtc(dateValue: string, hour: number): string {
    if (!dateValue) return '';
    return `${dateValue}T${String(hour).padStart(2, '0')}:00:00Z`;
  }

  nextStep() {
    if (this.stepAtual < this.stepTotal) {
      this.stepAtual++;
    } else {
      this.finalizar();
    }
  }

  backStep() {
    if (this.stepAtual > 1) {
      this.stepAtual--;
    }
  }

  finalizar() {
    const payload: CreateOsPayload = {
      unitId: this.loja ?? 1,
      vehicleId: this.veiculo ?? 10,
      ownerCustomerId: this.cliente ?? 25,
      entryDate: this.toIsoUtc(this.dataEntrada, 10),
      estimatedDeliveryDate: this.toIsoUtc(this.dataSaida, 18),
      bodyworkDescription: this.funilaria,
      bodyworkValue: this.parseCurrency(this.valorFunilaria),
      paintDescription: this.pintura,
      paintValue: this.parseCurrency(this.valorPintura),
      parts: this.pecasAdicionadas.map(p => ({
        description: p.nome,
        quantity: Number(p.quantidade),
        unitPrice: this.parseCurrency(p.valorUnitario)
      })),
    };
    this.osService.postServiceOrder(payload).subscribe({
      next: () => {
        this.router.navigate(['/os-list']);
      },
      error: () => {
      }
    });

    console.log('CREATE OS', payload);
  }

  goBackList() {
    this.router.navigate(['/os-list']);
  }

  adicionarPeca() {
    console.log('adicionarPeca pai chamado', this.peca, this.quantidade, this.valorUnitario);
    if (this.peca && this.quantidade && this.valorUnitario) {
      this.pecasAdicionadas = [
        ...this.pecasAdicionadas,
        {
          nome: this.peca,
          quantidade: Number(this.quantidade),
          valorUnitario: this.parseCurrency(this.valorUnitario),
        }
      ];
      this.peca = '';
      this.quantidade = null;
      this.valorUnitario = '';
    }
  }

  aumentarQuantidade(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    peca.quantidade++;
  }

  diminuirQuantidade(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    if (peca.quantidade > 1) peca.quantidade--;
  }

  removerPeca(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    this.pecasAdicionadas = this.pecasAdicionadas.filter((p) => p !== peca);
  }
}

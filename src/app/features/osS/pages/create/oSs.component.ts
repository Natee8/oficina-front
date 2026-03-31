import { Component, OnInit, DoCheck } from '@angular/core';
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
import { createOsData, OsData } from '../../model/dtos/os.data';
import { StepOneOsSchema } from '../../schemas/stepOne.schema';

@Component({
  selector: 'app-os-create',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [CommonModule, FormsModule, OsStepOneComponent, OsStepTwoComponent, BackButtonComponent],
})
export class OSsCreateComponent implements OnInit, DoCheck {
  lojas: StoreDto[] = [];
  clientes: ClientDto[] = [];
  veiculos: VehicleDto[] = [];

  errors: Record<string, string> = {};
  osData: OsData = createOsData();

  pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[] = [];

  stepAtual = 1;
  stepTotal = 2;

  private lastLoja: number | null = null;
  private lastCliente: number | null = null;

  constructor(
    private router: Router,
    private osService: OsService,
    private storeService: StoreService,
    private clientService: ClientService,
    private vehicleService: VehicleService,
  ) {}

  ngOnInit() {
    this.storeService.getStores().subscribe((lojas) => (this.lojas = lojas));
  }

  ngDoCheck() {
    // Atualização de clientes quando muda a loja
    if (this.osData.loja !== this.lastLoja) {
      this.lastLoja = this.osData.loja;

      this.osData.cliente = null;
      this.osData.veiculo = null;
      this.clientes = [];
      this.veiculos = [];

      if (!this.osData.loja) return;

      this.clientService.getCustomers().subscribe({
        next: (customers) =>
          (this.clientes = customers.filter((c) =>
            c.unitIds?.includes(this.osData.loja as number),
          )),
        error: () => (this.clientes = []),
      });
    }

    // Atualização de veículos quando muda o cliente
    if (this.osData.cliente !== this.lastCliente) {
      this.lastCliente = this.osData.cliente;

      this.osData.veiculo = null;
      this.veiculos = [];

      if (!this.osData.loja || !this.osData.cliente) return;

      this.vehicleService.getVehicles().subscribe({
        next: (vehicles) =>
          (this.veiculos = vehicles.filter((v) => v.customerId === this.osData.cliente)),
        error: () => (this.veiculos = []),
      });
    }
  }

  private parseCurrency(value: string | number | null | undefined): number {
    if (value == null) return 0;
    if (typeof value === 'number') return value;
    return Number(value.toString().trim().replace(/\./g, '').replace(',', '.')) || 0;
  }

  private toIsoUtc(dateValue: string, hour: number): string {
    if (!dateValue) return '';
    return `${dateValue}T${String(hour).padStart(2, '0')}:00:00Z`;
  }

  async nextStep() {
    this.errors = {};

    if (this.stepAtual === 1) {
      try {
        const parsedData = {
          ...this.osData,
          valorPintura: parseFloat(this.osData.valorPintura.replace(/\./g, '').replace(',', '.')),
          valorFunilaria: parseFloat(
            this.osData.valorFunilaria.replace(/\./g, '').replace(',', '.'),
          ),
        };

        await StepOneOsSchema.validate(parsedData, { abortEarly: false });
        this.stepAtual++;
      } catch (err: any) {
        this.errors = {};
        err.inner.forEach((e: any) => {
          if (e.path) this.errors[e.path] = e.message;
        });
      }
    } else {
      // Step Two é opcional, apenas avançamos ou finalizamos
      if (this.stepAtual < this.stepTotal) {
        this.stepAtual++;
      } else {
        this.finalizar();
      }
    }
  }

  backStep() {
    if (this.stepAtual > 1) this.stepAtual--;
  }

  finalizar() {
    const payload: CreateOsPayload = {
      unitId: this.osData.loja ?? 1,
      vehicleId: this.osData.veiculo ?? 10,
      ownerCustomerId: this.osData.cliente ?? 25,
      entryDate: this.toIsoUtc(this.osData.dataEntrada, 10),
      estimatedDeliveryDate: this.toIsoUtc(this.osData.dataSaida, 18),
      bodyworkDescription: this.osData.funilaria,
      bodyworkValue: this.parseCurrency(this.osData.valorFunilaria),
      paintDescription: this.osData.pintura,
      paintValue: this.parseCurrency(this.osData.valorPintura),
      parts: this.pecasAdicionadas.map((p) => ({
        description: p.nome,
        quantity: Number(p.quantidade),
        unitPrice: this.parseCurrency(p.valorUnitario),
      })),
    };

    this.osService.postServiceOrder(payload).subscribe({
      next: () => this.router.navigate(['/os-list']),
      error: (err) => console.error('Erro ao criar OS:', err),
    });

    console.log('CREATE OS', payload);
  }

  goBackList() {
    this.router.navigate(['/os-list']);
  }

  adicionarPeca() {
    if (this.osData.peca && this.osData.quantidade && this.osData.valorUnitario) {
      this.pecasAdicionadas.push({
        nome: this.osData.peca,
        quantidade: Number(this.osData.quantidade),
        valorUnitario: this.parseCurrency(this.osData.valorUnitario),
      });
      this.osData.peca = '';
      this.osData.quantidade = null;
      this.osData.valorUnitario = '';
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

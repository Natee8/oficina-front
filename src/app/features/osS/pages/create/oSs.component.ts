import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OsStepOneComponent } from '../../components/steps/one/stepOne.component';
import { OsStepTwoComponent } from '../../components/steps/two/stepTwo.component';
import { Router } from '@angular/router';
import { OsService } from '../../service/os.service';
import { StoreService } from '../../../stores/service/store.service';
import { StoreDto } from '../../../stores/model/store.dto';
import { ClientService } from '../../../clients/service/client.service';
import { ClientDto } from '../../../clients/model/dtos/client.dto';
import { VehicleDto } from '../../../car/model/dtos/vehicle.dto';
import { VehicleService } from '../../../car/service/car.service';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { createOsData, OsData } from '../../model/dtos/os.data';
import { StepOneOsSchema } from '../../schemas/stepOne.schema';
import { buildOsPayload } from '../../shared/functionPayload';
import { getOsErrorMessage } from '../../shared/getOsErrorMessage';
import {
  snackBarErrorConfig,
  snackBarSuccessConfig,
} from '../../../../core/config/snackbar.config';

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
  pieceErrors: Record<string, string> = {};
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
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.storeService.getStores().subscribe((lojas) => (this.lojas = lojas));
  }

  ngDoCheck() {
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
          valorPintura: this.osData.valorPintura
            ? parseFloat(this.osData.valorPintura.replace(/\./g, '').replace(',', '.'))
            : undefined,
          valorFunilaria: this.osData.valorFunilaria
            ? parseFloat(this.osData.valorFunilaria.replace(/\./g, '').replace(',', '.'))
            : undefined,
          valorMecanica: this.osData.valorMecanica
            ? parseFloat(this.osData.valorMecanica.replace(/\./g, '').replace(',', '.'))
            : undefined,
        };

        await StepOneOsSchema.validate(parsedData, {
          abortEarly: false,
        });
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
    const payload = buildOsPayload(this.osData, this.pecasAdicionadas);

    this.osService.postServiceOrder(payload).subscribe({
      next: () => {
        this.snackBar.open('OS criada com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.router.navigate(['/os-list']);
      },
      error: (err) => {
        console.error('Erro ao criar OS:', err);
        this.snackBar.open(getOsErrorMessage(err), 'Fechar', snackBarErrorConfig);
      },
    });
  }

  goBackList() {
    this.router.navigate(['/os-list']);
  }

  adicionarPeca() {
    if (!this.validatePartFields()) {
      return;
    }

    this.pecasAdicionadas.push({
      nome: this.osData.peca.trim(),
      quantidade: Number(this.osData.quantidade),
      valorUnitario: this.parseCurrency(this.osData.valorUnitario),
    });
    this.pieceErrors = {};
    this.osData.peca = '';
    this.osData.quantidade = null;
    this.osData.valorUnitario = '';
  }

  private validatePartFields(): boolean {
    const nextErrors: Record<string, string> = {};
    const pieceName = this.osData.peca?.trim();
    const quantity = Number(this.osData.quantidade);
    const unitPrice = this.parseCurrency(this.osData.valorUnitario);

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
    } else if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      nextErrors['valorUnitario'] = 'Valor unitário deve ser maior que zero.';
    }

    this.pieceErrors = nextErrors;
    return Object.keys(nextErrors).length === 0;
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

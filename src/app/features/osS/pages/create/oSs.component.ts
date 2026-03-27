import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OsStepOneComponent } from '../../components/steps/one/stepOne.component';
import { OsStepTwoComponent } from '../../components/steps/two/stepTwo.component';
import { Router } from '@angular/router';
import { OsService, CreateOsPayload } from '../../service/os.service';
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
export class OSsCreateComponent {
  lojas: string[] = ['Loja 1', 'Loja 2', 'Loja 3'];
  clientes: string[] = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
  veiculos: string[] = ['Veículo 1', 'Veículo 2', 'Veículo 3'];

  constructor(private router: Router, private osService: OsService) {}

  pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[] = [];

  loja: string = '';
  cliente: string = '';
  veiculo: string = '';
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
    // qual seria o endpoint para pegar o veiculo e seu cliente dono?
    const payload: CreateOsPayload = {
      unitId: 1, 
      vehicleId: 10, // Select de veiculos de acordo com o get unit 
      ownerCustomerId: 25, // Costumer Id automatico de acordo com o veiculo selecionado
      entryDate: this.dataEntrada,
      estimatedDeliveryDate: this.dataSaida,
      bodyworkDescription: this.funilaria,
      bodyworkValue: Number(this.valorFunilaria),
      paintDescription: this.pintura,
      paintValue: Number(this.valorPintura),
      parts: this.pecasAdicionadas.map(p => ({
        description: p.nome,
        quantity: p.quantidade,
        unitPrice: p.valorUnitario
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
        { nome: this.peca, quantidade: this.quantidade, valorUnitario: Number(this.valorUnitario) }
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

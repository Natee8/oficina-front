import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OsStepOneComponent } from '../../components/steps/one/stepOne.component';
import { OsStepTwoComponent } from '../../components/steps/two/stepTwo.component';

@Component({
  selector: 'app-os-create',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [CommonModule, FormsModule, CommonModule, OsStepOneComponent, OsStepTwoComponent],
})
export class OSsCreateComponent {
  lojas: string[] = ['Loja 1', 'Loja 2', 'Loja 3'];
  clientes: string[] = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
  veiculos: string[] = ['Veículo 1', 'Veículo 2', 'Veículo 3'];

  pecasAdicionadas: { nome: string; quantidade: number }[] = [
    { nome: 'Radiador 125486UD', quantidade: 12 },
    { nome: 'Motor 45845UA', quantidade: 12 },
  ];

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
    const payload = {
      loja: this.loja,
      cliente: this.cliente,
      veiculo: this.veiculo,
      dataEntrada: this.dataEntrada,
      dataSaida: this.dataSaida,
      pintura: this.pintura,
      valorPintura: this.valorPintura,
      funilaria: this.funilaria,
      valorFunilaria: this.valorFunilaria,
      pecas: this.pecasAdicionadas,
    };

    console.log('CREATE OS', payload);
  }

  goBackList() {}

  adicionarPeca() {
    if (this.peca && this.quantidade) {
      this.pecasAdicionadas.push({ nome: this.peca, quantidade: this.quantidade });
      this.peca = '';
      this.quantidade = null;
      this.valorUnitario = '';
    }
  }

  aumentarQuantidade(peca: { nome: string; quantidade: number }) {
    peca.quantidade++;
  }

  diminuirQuantidade(peca: { nome: string; quantidade: number }) {
    if (peca.quantidade > 1) peca.quantidade--;
  }

  removerPeca(peca: { nome: string; quantidade: number }) {
    this.pecasAdicionadas = this.pecasAdicionadas.filter((p) => p !== peca);
  }
}

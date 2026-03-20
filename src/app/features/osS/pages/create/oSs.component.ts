import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';

@Component({
  selector: 'app-oSs-create',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    InputFieldComponent,
    SelectFieldComponent,
    BackButtonComponent,
  ],
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

  // Segunda etapa
  segundaEtapa: boolean = false;
  peca: string = '';
  quantidade: number | null = null;
  valorUnitario: string = '';

  avancar() {
    this.segundaEtapa = true;
  }

  voltar() {
    this.segundaEtapa = false;
  }

  goBackList() {
    // Lógica para voltar para a lista de OSs
  }

  aumentarQuantidade(peca: { nome: string; quantidade: number }) {
    peca.quantidade++;
  }

  diminuirQuantidade(peca: { nome: string; quantidade: number }) {
    if (peca.quantidade > 1) peca.quantidade--;
  }

  removerPeca(peca: { nome: string; quantidade: number }) {
    this.pecasAdicionadas = this.pecasAdicionadas.filter(p => p !== peca);
  }
}

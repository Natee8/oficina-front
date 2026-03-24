import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { StepperComponent } from '../../../../shared/components/stepsPopup.ts/stepsPopup.component';
import { ReviewStepComponent } from '../../../../shared/components/reviewStep/reviewStep.component';
import { ToggleActionsComponent } from '../../../../shared/components/buttonNext/buttonNext.component';

import { OsStepOneComponent } from '../steps/one/stepOne.component';
import { OsStepTwoComponent } from '../steps/two/stepTwo.component';
import { stepsConfigOs } from '../../../../core/config/stepsLabel.config';

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
export class EditOsModalComponent {
  stepIndex = 0;

  loja = '';
  cliente = '';
  veiculo = '';
  dataEntrada = '';
  dataSaida = '';
  pintura = '';
  valorPintura = '';
  funilaria = '';
  valorFunilaria = '';
  stepsConfig = stepsConfigOs;

  peca = '';
  quantidade: number | null = null;
  valorUnitario = '';
  pecasAdicionadas: any[] = [];

  @Input() os: any;
  @Input() lojas: any[] = [];
  @Input() clientes: any[] = [];
  @Input() veiculos: any[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();

  ngOnInit() {
    if (this.os) {
      this.loja = this.os.loja;
      this.cliente = this.os.cliente;
      this.veiculo = this.os.veiculo;
      this.dataEntrada = this.os.dataEntrada;
      this.dataSaida = this.os.dataSaida;
      this.pintura = this.os.pintura;
      this.valorPintura = this.os.valorPintura;
      this.funilaria = this.os.funilaria;
      this.valorFunilaria = this.os.valorFunilaria;

      this.pecasAdicionadas = this.os.pecas || [];
    }
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
          { label: 'Valor Pintura', value: this.valorPintura },
          { label: 'Funilaria', value: this.funilaria },
          { label: 'Valor Funilaria', value: this.valorFunilaria },
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

    console.log('EDIT OS', payload);
  }

  close() {
    this.closeModalEvent.emit();
  }
}

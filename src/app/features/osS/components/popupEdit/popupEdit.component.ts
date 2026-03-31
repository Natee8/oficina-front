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
import { createOsData, OsData } from '../../model/dtos/os.data';

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
  osData: OsData = createOsData();
  pecasAdicionadas: any[] = [];
  stepsConfig = stepsConfigOs;

  @Input() os: any;
  @Input() lojas: any[] = [];
  @Input() clientes: any[] = [];
  @Input() veiculos: any[] = [];

  @Output() closeModalEvent = new EventEmitter<void>();

  ngOnInit() {
    if (this.os) {
      this.osData = {
        loja: Number(this.os.loja),
        cliente: Number(this.os.cliente),
        veiculo: Number(this.os.veiculo),
        dataEntrada: this.os.dataEntrada,
        dataSaida: this.os.dataSaida,
        pintura: this.os.pintura,
        valorPintura: this.os.valorPintura,
        funilaria: this.os.funilaria,
        valorFunilaria: this.os.valorFunilaria,
        peca: '',
        quantidade: null,
        valorUnitario: '',
      };
    }
  }

  get reviewData() {
    return [
      {
        title: 'Informações da OS',
        fields: [
          { label: 'Loja', value: this.osData.loja },
          { label: 'Cliente', value: this.osData.cliente },
          { label: 'Veículo', value: this.osData.veiculo },
          { label: 'Entrada', value: this.osData.dataEntrada },
          { label: 'Saída', value: this.osData.dataSaida },
        ],
      },
      {
        title: 'Serviços',
        fields: [
          { label: 'Pintura', value: this.osData.pintura },
          { label: 'Valor Pintura', value: this.osData.valorPintura },
          { label: 'Funilaria', value: this.osData.funilaria },
          { label: 'Valor Funilaria', value: this.osData.valorFunilaria },
        ],
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
    if (!this.osData.peca || !this.osData.quantidade) return;

    this.pecasAdicionadas.push({
      nome: this.osData.peca,
      quantidade: this.osData.quantidade,
      valor: this.osData.valorUnitario,
    });

    this.osData.peca = '';
    this.osData.quantidade = null;
    this.osData.valorUnitario = '';
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
      ...this.osData,
      pecas: this.pecasAdicionadas,
    };

    console.log('EDIT OS', payload);
  }

  close() {
    this.closeModalEvent.emit();
  }
}

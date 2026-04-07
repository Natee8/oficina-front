import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { OsData } from '../../../model/dtos/os.data';

@Component({
  selector: 'app-os-step-two',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
  imports: [FormsModule, InputFieldComponent, CommonModule],
})
export class OsStepTwoComponent {
  @Input() data!: OsData;

  @Input() pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[] = [];
  @Input() errors: Record<string, string> = {};

  @Output() adicionarPeca = new EventEmitter<void>();
  @Output() removerPecaEvent = new EventEmitter<any>();
  @Output() aumentarQtd = new EventEmitter<any>();
  @Output() diminuirQtd = new EventEmitter<any>();
  @Output() voltarStep = new EventEmitter<void>();

  adicionar() {
    this.adicionarPeca.emit();
  }

  aumentar(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    this.aumentarQtd.emit(peca);
  }

  diminuir(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    this.diminuirQtd.emit(peca);
  }

  remover(peca: { nome: string; quantidade: number; valorUnitario: number }) {
    this.removerPecaEvent.emit(peca);
  }

  voltar() {
    this.voltarStep.emit();
  }

  clearFieldError(field: 'peca' | 'quantidade' | 'valorUnitario') {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }
}

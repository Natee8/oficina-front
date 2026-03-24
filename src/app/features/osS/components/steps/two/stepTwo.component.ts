import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-os-step-two',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  imports: [FormsModule, InputFieldComponent, CommonModule],
})
export class OsStepTwoComponent {
  @Input() peca!: string;
  @Input() quantidade!: number | null;
  @Input() valorUnitario!: string;
  @Input() pecasAdicionadas: any[] = [];

  @Output() pecaChange = new EventEmitter<string>();
  @Output() quantidadeChange = new EventEmitter<number | null>();
  @Output() valorUnitarioChange = new EventEmitter<string>();

  @Output() adicionarPeca = new EventEmitter<void>();
  @Output() voltarStep = new EventEmitter<void>();
  @Output() aumentarQtd = new EventEmitter<any>();
  @Output() diminuirQtd = new EventEmitter<any>();
  @Output() removerPecaEvent = new EventEmitter<any>();

  updateField(field: keyof OsStepTwoComponent, value: any) {
    (this as any)[field] = value;
    const eventName = field + 'Change';
    (this as any)[eventName]?.emit(value);
  }

  adicionar() {
    this.adicionarPeca.emit();
  }

  aumentar(peca: any) {
    this.aumentarQtd.emit(peca);
  }

  diminuir(peca: any) {
    this.diminuirQtd.emit(peca);
  }

  remover(peca: any) {
    this.removerPecaEvent.emit(peca);
  }

  voltar() {
    this.voltarStep.emit();
  }
}

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-os-step-two',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
  imports: [FormsModule, InputFieldComponent, CommonModule],
})
export class OsStepTwoComponent implements OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['pecasAdicionadas']) {
        console.log('pecasAdicionadas atualizado:', this.pecasAdicionadas);
      }
    }
  @Input() peca: string = '';
  @Input() quantidade: number | null = null;
  @Input() valorUnitario: string = '';
  @Input() pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[] = [];

  @Output() pecaChange = new EventEmitter<string>();
  @Output() quantidadeChange = new EventEmitter<number | null>();
  @Output() valorUnitarioChange = new EventEmitter<string>();

  @Output() adicionarPeca = new EventEmitter<void>();
  @Output() voltarStep = new EventEmitter<void>();
  @Output() aumentarQtd = new EventEmitter<{ nome: string; quantidade: number; valorUnitario: number }>();
  @Output() diminuirQtd = new EventEmitter<{ nome: string; quantidade: number; valorUnitario: number }>();
  @Output() removerPecaEvent = new EventEmitter<{ nome: string; quantidade: number; valorUnitario: number }>();

  updateField(field: 'peca' | 'quantidade' | 'valorUnitario', value: any) {
    (this as any)[field] = value;
    const eventName = field + 'Change';
    (this as any)[eventName]?.emit(value);
  }

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
}

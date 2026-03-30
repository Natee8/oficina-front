import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/select/selectField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-os-step-one',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [FormsModule, InputFieldComponent, SelectFieldComponent, CommonModule],
})
export class OsStepOneComponent {

  @Input() lojas: any[] = [];
  @Input() clientes: any[] = [];
  @Input() veiculos: any[] = [];

  @Input() loja!: number | null;
  @Input() cliente!: string;
  @Input() veiculo!: string;
  @Input() dataEntrada!: string;
  @Input() dataSaida!: string;
  @Input() pintura!: string;
  @Input() valorPintura!: string;
  @Input() funilaria!: string;
  @Input() valorFunilaria!: string;

  @Output() lojaChange = new EventEmitter<number | null>();
  @Output() clienteChange = new EventEmitter<string>();
  @Output() veiculoChange = new EventEmitter<string>();
  @Output() dataEntradaChange = new EventEmitter<string>();
  @Output() dataSaidaChange = new EventEmitter<string>();
  @Output() pinturaChange = new EventEmitter<string>();
  @Output() valorPinturaChange = new EventEmitter<string>();
  @Output() funilariaChange = new EventEmitter<string>();
  @Output() valorFunilariaChange = new EventEmitter<string>();

  @Output() avancarStep = new EventEmitter<void>();

  avancar() {
    this.avancarStep.emit();
  }

  updateField(field: keyof OsStepOneComponent, value: any) {
    (this as any)[field] = value;
    const eventName = field + 'Change';
    (this as any)[eventName]?.emit(value);
  }
}

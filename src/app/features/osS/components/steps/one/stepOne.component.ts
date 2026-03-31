import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/select/selectField.component';
import { CommonModule } from '@angular/common';
import { OsData } from '../../../model/dtos/os.data';

@Component({
  selector: 'app-os-step-one',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [FormsModule, InputFieldComponent, SelectFieldComponent, CommonModule],
})
export class OsStepOneComponent {
  @Input() data: OsData = {
    loja: null,
    cliente: null,
    veiculo: null,
    dataEntrada: '',
    dataSaida: '',
    pintura: '',
    valorPintura: '',
    funilaria: '',
    valorFunilaria: '',
    peca: '',
    quantidade: null,
    valorUnitario: '',
  };
  @Input() errors: Record<string, string> = {};

  @Input() lojas: any[] = [];
  @Input() clientes: any[] = [];
  @Input() veiculos: any[] = [];

  get lojaOptions() {
    return this.lojas.map((loja) => ({
      label: loja?.name ?? '',
      value: loja?.id ?? null,
    }));
  }

  get clienteOptions() {
    return this.clientes.map((cliente) => ({
      label: cliente?.name ?? '',
      value: cliente?.id ?? null,
    }));
  }

  get veiculoOptions() {
    return this.veiculos.map((veiculo) => ({
      label: `${veiculo?.model ?? ''} ${veiculo?.plate ?? ''}`,
      value: veiculo?.id ?? null,
    }));
  }
}

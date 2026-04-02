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
  private readonly maxRangeDays = 60;

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
    mecanica: '',
    valorMecanica: '',
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

  get today(): string {
    return this.formatDate(new Date());
  }

  get minDataSaida(): string {
    if (!this.data.dataEntrada) return this.today;

    const entryDate = this.parseDate(this.data.dataEntrada);
    if (!entryDate) return this.today;

    entryDate.setDate(entryDate.getDate() + 1);
    return this.formatDate(entryDate);
  }

  get maxDataSaida(): string | undefined {
    if (!this.data.dataEntrada) return '';

    const entryDate = this.parseDate(this.data.dataEntrada);
    if (!entryDate) return undefined;

    entryDate.setDate(entryDate.getDate() + this.maxRangeDays);
    return this.formatDate(entryDate);
  }

  onDataEntradaChange(value: string): void {
    this.clearDateError('dataEntrada');
    this.clearDateError('dataSaida');

    if (!value) return;

    const entryDate = this.parseDate(value);
    if (!entryDate) return;

    if (this.isWeekend(entryDate)) {
      this.data.dataEntrada = '';
      this.errors['dataEntrada'] = 'Data de entrada não pode ser fim de semana';
      return;
    }

    if (this.data.dataSaida) {
      const exitDate = this.parseDate(this.data.dataSaida);
      if (!exitDate) return;

      const minExitDate = this.parseDate(this.minDataSaida);
      const maxDataSaida = this.maxDataSaida;
      const maxExitDate = maxDataSaida ? this.parseDate(maxDataSaida) : null;

      if (
        this.isWeekend(exitDate) ||
        !minExitDate ||
        !maxExitDate ||
        exitDate < minExitDate ||
        exitDate > maxExitDate
      ) {
        this.data.dataSaida = '';
        this.errors['dataSaida'] = 'Selecione uma data de saída válida após a entrada';
      }
    }
  }

  onDataSaidaChange(value: string): void {
    this.clearDateError('dataSaida');
    if (!value) return;

    const exitDate = this.parseDate(value);
    if (!exitDate) return;

    if (this.isWeekend(exitDate)) {
      this.data.dataSaida = '';
      this.errors['dataSaida'] = 'Data de saída não pode ser fim de semana';
    }
  }

  private clearDateError(field: 'dataEntrada' | 'dataSaida'): void {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }

  private parseDate(value: string): Date | null {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return null;

    const date = new Date(year, month - 1, day);
    if (
      Number.isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    date.setHours(0, 0, 0, 0);
    return date;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf, NgClass } from '@angular/common';
import { ToggleActionsComponent } from "../../../../shared/components/buttonNext/buttonNext.component";
@Component({
  selector: 'app-status-modal',
  templateUrl: './modelStatus.component.html',
  styleUrls: ['./modelStatus.component.scss'],
  imports: [NgForOf, NgIf, NgClass, ToggleActionsComponent],
})
export class StatusModalComponent {
  @Input() isOpen = false;
  @Input() pedidoId!: number;

  private _current = '';
  @Input() set current(value: string) {
    this._current = this.normalizeStatus(value);
    this.selected = this._current;
  }
  get current() {
    return this._current;
  }

  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<string>();

  selected = '';

  statusList = [
    {
      value: 'enviado',
      label: 'Enviado',
      description: 'Enviado para o cliente',
    },
    {
      value: 'feito',
      label: 'Feito',
      description: 'Pago pelo cliente',
    },
    {
      value: 'finalizado',
      label: 'Finalizado',
      description: 'Pago e entregue ao cliente',
    },
  ];

  private normalizeStatus(status: string | null | undefined): string {
    if (!status) return '';

    const normalized = status
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (normalized === 'enviado' || normalized === 'feito' || normalized === 'finalizado') {
      return normalized;
    }

    return '';
  }

  select(value: string) {
    this.selected = value;
  }

  close() {
    this.onClose.emit();
  }

  confirm() {
    this.onConfirm.emit(this.selected);
  }
}

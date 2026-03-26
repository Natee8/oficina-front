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
  @Input() current!: string;

  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<string>();

  selected!: string;

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

  ngOnInit() {
    this.selected = this.current;
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

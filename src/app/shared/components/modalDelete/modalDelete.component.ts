import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../popup/popup.component';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  templateUrl: './modalDelete.component.html',
  styleUrls: ['./modalDelete.component.scss'],
  imports: [CommonModule, ModalComponent],
})
export class ModalDelete {
  @Input() registro: any;
  @Input() titulo: string = 'Excluir Registro';
  @Input() mensagem: string =
    'Deseja realmente excluir este registro? Essa ação não pode ser desfeita.';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}

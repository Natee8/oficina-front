import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-actions',
  standalone: true,
  templateUrl: './buttonTable.component.html',
  styleUrls: ['./buttonTable.component.scss'],
})
export class TableActionsComponent {
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableFooterComponent } from '../tableFooter/tableFooter.component';

@Component({
  selector: 'app-table-header',
  standalone: true,
  templateUrl: './tableHeader.component.html',
  styleUrls: ['./tableHeader.component.scss'],
})
export class TableHeaderComponent {
  @Input() icon!: string;
  @Input() title!: string;

  @Output() search = new EventEmitter<string>();
}

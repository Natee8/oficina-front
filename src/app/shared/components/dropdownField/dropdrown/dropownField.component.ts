import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropownField.component.html',
  styleUrls: ['./dropownField.component.scss'],
})
export class DropdownComponent {
  @Input() open = false;
  @Input() groups: any[] = [];
  @Input() filters: any = {};

  @Output() filtersChange = new EventEmitter<any>();
  @Output() applyFilters = new EventEmitter<void>();
  @Output() clearFilters = new EventEmitter<void>();

  selectOption(key: string, value: any) {
    this.filters[key] = value;

    this.filtersChange.emit(this.filters);
  }

  apply() {
    this.applyFilters.emit();
  }

  clear() {
    this.clearFilters.emit();
  }
}

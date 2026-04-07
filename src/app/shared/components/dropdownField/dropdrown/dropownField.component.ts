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
    if (!Array.isArray(this.filters[key])) {
      this.filters[key] = [];
    }

    const index = this.filters[key].indexOf(value);

    if (index > -1) {
      this.filters[key].splice(index, 1);
    } else {
      if (value === null) {
        this.filters[key] = [null];
      } else {
        this.filters[key] = this.filters[key].filter((v: any) => v !== null);
        this.filters[key].push(value);
      }
    }

    this.filtersChange.emit(this.filters);
  }

  apply() {
    this.applyFilters.emit();
  }

  clear() {
    this.clearFilters.emit();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-footer',
  standalone: true,
  templateUrl: './tableFooter.component.html',
  styleUrls: ['./tableFooter.component.scss'],
  imports: [CommonModule],
})
export class TableFooterComponent {
  @Input() page = 1;
  @Input() totalPages = 1;
  @Input() totalItems = 0;
  @Input() pageSize = 5;

  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, start + 4);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get startItem(): number {
    return (this.page - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.page * this.pageSize, this.totalItems);
  }

  goToPage(p: number) {
    this.pageChange.emit(p);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
    }
  }
}

import { Component } from '@angular/core';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { CommonModule } from '@angular/common';
import { TableStoresMock } from '../../service/mock';

@Component({
  selector: 'app-table-stores',
  standalone: true,
  templateUrl: './tableStores.component.html',
  styleUrls: ['./tableStores.component.scss'],
  imports: [CommonModule, TableHeaderComponent, TableFooterComponent],
})
export class TableStores {
  page = 1;
  totalPages = 5;

  columns = TableStoresMock.columns;
  stores = TableStoresMock.stores;

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }
}

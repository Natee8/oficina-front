import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { UserColumns, UserListMock } from '../../service/mock';

@Component({
  selector: 'app-table-employees',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, TableHeaderComponent, TableFooterComponent],
})
export class TableEmployees {
  page = 1;
  totalPages = 5;
  pageSize = 5;

  columns = UserColumns;
  osList = UserListMock;

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }
}

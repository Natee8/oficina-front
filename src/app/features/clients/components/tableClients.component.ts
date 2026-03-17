import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../shared/components/tableFooter/tableFooter.component';
import { ClientColumns, ClientListMock } from '../service/mock';
import { TableActionsComponent } from '../../../shared/components/buttonTable/buttonTable.component';

@Component({
  selector: 'app-table-clients',
  standalone: true,
  templateUrl: './tableClients.component.html',
  styleUrls: ['./tableClients.component.scss'],
  imports: [CommonModule, TableHeaderComponent, TableFooterComponent, TableActionsComponent],
})
export class TableClients {
  page = 1;
  totalPages = 5;
  pageSize = 5;

  columns = ClientColumns;
  clientList = ClientListMock;

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }
  handleEdit(client: any) {
    console.log('Editar:', client);
  }

  handleDelete(client: any) {
    console.log('Deletar:', client);
  }
}

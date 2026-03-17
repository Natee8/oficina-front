import { Component } from '@angular/core';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { CommonModule } from '@angular/common';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { TableVehiclesMock } from '../../service/mock';

@Component({
  selector: 'app-table-car',
  standalone: true,
  templateUrl: './tableCar.component.html',
  styleUrls: ['./tableCar.component.scss'],
  imports: [CommonModule, TableHeaderComponent, TableFooterComponent, TableActionsComponent],
})
export class TableCar {
  page = 1;
  totalPages = 5;

  columns = TableVehiclesMock.columns;
  vehicles = TableVehiclesMock.vehicles;

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

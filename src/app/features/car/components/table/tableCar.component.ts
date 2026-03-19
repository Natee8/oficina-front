import { Component } from '@angular/core';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { CommonModule } from '@angular/common';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { TableVehiclesMock } from '../../service/mock';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { ModalComponent } from '../../../../shared/components/popup/popup.component';

@Component({
  selector: 'app-table-car',
  standalone: true,
  templateUrl: './tableCar.component.html',
  styleUrls: ['./tableCar.component.scss'],
  imports: [
    CommonModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableActionsComponent,
    ModalComponent,
    ModalDelete,
  ],
})
export class TableCar {
  page = 1;
  totalPages = 5;

  activeModal: 'edit' | 'delete' | null = null;
  selectedOs: any = null;

  columns = TableVehiclesMock.columns;
  vehicles = TableVehiclesMock.vehicles;

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  handleEdit(os: any) {
    this.selectedOs = os;
    this.activeModal = 'edit';
  }

  handleDelete(os: any) {
    this.selectedOs = os;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    console.log('Deletar OS:', this.selectedOs);
    this.closeModal();
  }

  closeModal() {
    this.activeModal = null;
    this.selectedOs = null;
  }
}

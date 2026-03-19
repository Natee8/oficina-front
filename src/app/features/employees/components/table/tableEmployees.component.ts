import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { UserColumns, UserListMock } from '../../service/mock';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';

@Component({
  selector: 'app-table-employees',
  standalone: true,
  templateUrl: './tableEmployees.component.html',
  styleUrls: ['./tableEmployees.component.scss'],
  imports: [
    CommonModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableActionsComponent,
    ModalComponent,
    ModalDelete,
  ],
})
export class TableEmployees {
  page = 1;
  totalPages = 5;
  pageSize = 5;
  activeModal: 'edit' | 'delete' | null = null;
  selectedOs: any = null;

  columns = UserColumns;
  userList = UserListMock;

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

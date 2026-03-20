import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { UserColumns, UserListMock } from '../../service/mock';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditEmployeeModalComponent } from '../popupEdit/popupEdit.component';

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
    ModalDelete,
    EditEmployeeModalComponent,
  ],
})
export class TableEmployees {
  page = 1;
  totalPages = 5;
  pageSize = 5;
  activeModal: 'edit' | 'delete' | null = null;
  selectedEmployeer: any = null;

  columns = UserColumns;
  userList = UserListMock;

  @Input() store: any;

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  handleEdit(os: any) {
    this.selectedEmployeer = os;
    this.activeModal = 'edit';
  }

  handleDelete(os: any) {
    this.selectedEmployeer = os;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    console.log('Deletar OS:', this.selectedEmployeer);
    this.closeModal();
  }

  closeModal() {
    this.activeModal = null;
    this.selectedEmployeer = null;
  }
}

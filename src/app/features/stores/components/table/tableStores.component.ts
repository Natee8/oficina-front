import { Component } from '@angular/core';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { CommonModule } from '@angular/common';
import { TableStoresMock } from '../../service/mock';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditStoreModalComponent } from '../popupEdit/popupEdit.component';

@Component({
  selector: 'app-table-stores',
  standalone: true,
  templateUrl: './tableStores.component.html',
  styleUrls: ['./tableStores.component.scss'],
  imports: [
    CommonModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableActionsComponent,
    ModalDelete,
    EditStoreModalComponent,
  ],
})
export class TableStores {
  page = 1;
  totalPages = 5;

  columns = TableStoresMock.columns;
  stores = TableStoresMock.stores;
  activeModal: 'edit' | 'delete' | null = null;
  selectedStore: any = null;

  handleEdit(store: any) {
    this.selectedStore = store;
    this.activeModal = 'edit';
  }

  handleDelete(store: any) {
    this.selectedStore = store;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    console.log('Deletar:', this.selectedStore);

    // aqui depois você chama API
    // await service.delete(this.selectedStore.id)

    this.closeModal();
  }

  closeModal() {
    this.activeModal = null;
    this.selectedStore = null;
  }
}

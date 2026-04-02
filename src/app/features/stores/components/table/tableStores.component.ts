import { Component, OnInit } from '@angular/core';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { CommonModule } from '@angular/common';
import { TableStoresMock } from '../../service/mock';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditStoreModalComponent } from '../popupEdit/popupEdit.component';
import { StoreService } from '../../service/store.service';
import { StoreDto } from '../../model/store.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

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
export class TableStores implements OnInit {
  page = 1;
  pageSize = 5;
  totalPages = 1;

  columns = TableStoresMock.columns;
  stores: StoreDto[] = [];
  activeModal: 'edit' | 'delete' | null = null;
  selectedStore: StoreDto | null = null;

  constructor(
    private storeService: StoreService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }

  private loadStores(): void {
    this.storeService.getStores().subscribe({
      next: (stores) => {
        this.stores = stores;
        this.totalPages = Math.max(1, Math.ceil(this.stores.length / this.pageSize));
      },
      error: () => {
        this.stores = [];
        this.totalPages = 1;
      },
    });
  }

  handleModalClose(updated: boolean): void {
    this.closeModal();
    if (updated) {
      this.loadStores();
    }
  }

  handleEdit(store: StoreDto) {
    this.selectedStore = store;
    this.activeModal = 'edit';
  }

  handleDelete(store: StoreDto) {
    this.selectedStore = store;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    if (!this.selectedStore?.id) {
      this.snackBar.open('Loja inválida para exclusão.', 'Fechar', snackBarErrorConfig);
      this.closeModal();
      return;
    }

    this.storeService.deleteStore(this.selectedStore.id).subscribe({
      next: () => {
        this.snackBar.open('Loja excluída com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.closeModal();
        this.loadStores();
      },
      error: (err) => {
        this.snackBar.open(err?.error?.message || 'Erro ao excluir a loja.', 'Fechar', snackBarErrorConfig);
        this.closeModal();
      },
    });
  }

  closeModal() {
    this.activeModal = null;
    this.selectedStore = null;
  }
}

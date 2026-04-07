import { Component, OnInit } from '@angular/core';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { CommonModule } from '@angular/common';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditStoreModalComponent } from '../popupEdit/popupEdit.component';
import { StoreService } from '../../service/store.service';
import { StoreDto } from '../../model/store.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

type StoreSortKey =
  | 'name'
  | 'cnpj'
  | 'addressStreet'
  | 'addressNumber'
  | 'addressCity'
  | 'addressDistrict';
type SortDirection = 'asc' | 'desc';

const STORE_COLUMNS = [
  { label: 'Nome', sortKey: 'name' as StoreSortKey },
  { label: 'CNPJ', sortKey: 'cnpj' as StoreSortKey },
  { label: 'Rua', sortKey: 'addressStreet' as StoreSortKey },
  { label: 'Número', sortKey: 'addressNumber' as StoreSortKey },
  { label: 'Cidade', sortKey: 'addressCity' as StoreSortKey },
  { label: 'Bairro', sortKey: 'addressDistrict' as StoreSortKey },
  { label: 'Ações', sortKey: null },
];

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

  columns = STORE_COLUMNS;
  stores: StoreDto[] = [];
  allStores: StoreDto[] = [];
  paginatedStores: StoreDto[] = [];
  searchTerm = '';
  sortColumn: StoreSortKey | null = null;
  sortDirection: SortDirection = 'asc';
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
        this.allStores = stores;
        this.applyFiltersAndSearch();
      },
      error: () => {
        this.allStores = [];
        this.stores = [];
        this.paginatedStores = [];
        this.totalPages = 1;
      },
    });
  }

  handleSearch(value: string): void {
    this.searchTerm = value.trim().toLowerCase();
    this.page = 1;
    this.applyFiltersAndSearch();
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) {
      return;
    }

    this.page = newPage;
    this.applyPagination();
  }

  toggleSort(column: { label: string; sortKey: StoreSortKey | null }): void {
    if (!column.sortKey) {
      return;
    }

    if (this.sortColumn === column.sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.sortKey;
      this.sortDirection = 'asc';
    }

    this.page = 1;
    this.applyFiltersAndSearch();
  }

  getSortIndicator(column: { label: string; sortKey: StoreSortKey | null }): string {
    if (!column.sortKey || this.sortColumn !== column.sortKey) {
      return '';
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
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

  private applyFiltersAndSearch(): void {
    const filteredStores = this.allStores.filter((store) => {
      if (!this.searchTerm) {
        return true;
      }

      const address = `${store.addressStreet} ${store.addressNumber} ${store.addressDistrict} ${store.addressCity} ${store.addressState} ${store.addressZip}`;
      const searchableValues = [
        store.name,
        store.cnpj,
        store.addressStreet,
        store.addressNumber,
        store.addressCity,
        store.addressDistrict,
        address,
      ];

      return searchableValues.some((item) =>
        String(item ?? '')
          .toLowerCase()
          .includes(this.searchTerm),
      );
    });

    this.stores = this.sortStores(filteredStores);
    this.applyPagination();
  }

  private applyPagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.stores.length / this.pageSize));
    this.page = Math.min(this.page, this.totalPages);

    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStores = this.stores.slice(startIndex, endIndex);
  }

  private sortStores(stores: StoreDto[]): StoreDto[] {
    if (!this.sortColumn) {
      return [...stores];
    }

    const sortColumn = this.sortColumn;
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    return [...stores].sort((firstStore, secondStore) => {
      const firstValue = String(firstStore[sortColumn] ?? '');
      const secondValue = String(secondStore[sortColumn] ?? '');

      return this.compareValues(firstValue, secondValue) * direction;
    });
  }

  private compareValues(firstValue: string, secondValue: string): number {
    return firstValue.localeCompare(secondValue, 'pt-BR', {
      numeric: true,
      sensitivity: 'base',
    });
  }
}

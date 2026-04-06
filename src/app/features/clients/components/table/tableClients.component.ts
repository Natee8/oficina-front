import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditClientModalComponent } from '../popupEdit/popupEdit.component';
import { ClientService } from '../../service/client.service';
import { ClientDto } from '../../model/dtos/client.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';
import { StoreService } from '../../../stores/service/store.service';

type ClientSortKey = 'name' | 'cpfCnpj' | 'stores' | 'addressCity' | 'addressDistrict' | 'email' | 'phone';
type SortDirection = 'asc' | 'desc';

const CLIENT_COLUMNS = [
  { label: 'Nome', sortKey: 'name' as ClientSortKey },
  { label: 'CPF/CNPJ', sortKey: 'cpfCnpj' as ClientSortKey },
  { label: 'Lojas', sortKey: 'stores' as ClientSortKey },
  { label: 'Cidade', sortKey: 'addressCity' as ClientSortKey },
  { label: 'Bairro', sortKey: 'addressDistrict' as ClientSortKey },
  { label: 'Email', sortKey: 'email' as ClientSortKey },
  { label: 'Telefone', sortKey: 'phone' as ClientSortKey },
  { label: 'Ações', sortKey: null },
];

@Component({
  selector: 'app-table-clients',
  standalone: true,
  templateUrl: './tableClients.component.html',
  styleUrls: ['./tableClients.component.scss'],
  imports: [
    CommonModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableActionsComponent,
    ModalDelete,
    EditClientModalComponent,
  ],
})
export class TableClients implements OnInit, OnChanges {
  page = 1;
  pageSize = 5;
  totalPages = 1;

  clientList: ClientDto[] = [];
  allClients: ClientDto[] = [];
  paginatedClients: ClientDto[] = [];
  columns = CLIENT_COLUMNS;
  searchTerm = '';
  sortColumn: ClientSortKey | null = null;
  sortDirection: SortDirection = 'asc';
  storeMap: Record<number, string> = {};

  activeModal: 'edit' | 'delete' | null = null;
  selectedClient: ClientDto | null = null;

  @Input() filters: { unitId: number | null } = {
    unitId: null,
  };

  constructor(
    private clientService: ClientService,
    private storeService: StoreService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.page = 1;
      this.applyFiltersAndSearch();
    }
  }

  ngOnInit() {
    this.loadStores();
    this.loadClients();
  }

  private loadStores(): void {
    this.storeService.getStores().subscribe({
      next: (stores) => {
        this.storeMap = stores.reduce<Record<number, string>>((accumulator, store) => {
          accumulator[store.id] = store.name;
          return accumulator;
        }, {});
        this.applyFiltersAndSearch();
      },
      error: () => {
        this.storeMap = {};
        this.applyFiltersAndSearch();
      },
    });
  }

  loadClients() {
    this.clientService.getCustomers().subscribe({
      next: (clients) => {
        this.allClients = clients;
        this.applyFiltersAndSearch();
      },
      error: (err) => {
        console.error('Erro ao buscar clientes:', err);
        this.allClients = [];
        this.clientList = [];
        this.paginatedClients = [];
        this.totalPages = 1;
      },
    });
  }

  applyPagination() {
    this.totalPages = Math.max(1, Math.ceil(this.clientList.length / this.pageSize));
    this.page = Math.min(this.page, this.totalPages);
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedClients = this.clientList.slice(startIndex, endIndex);
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.applyPagination();
  }

  handleSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    this.page = 1;
    this.applyFiltersAndSearch();
  }

  toggleSort(column: { label: string; sortKey: ClientSortKey | null }): void {
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

  getSortIndicator(column: { label: string; sortKey: ClientSortKey | null }): string {
    if (!column.sortKey || this.sortColumn !== column.sortKey) {
      return '';
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  handleEdit(client: ClientDto) {
    this.selectedClient = { ...client };
    this.activeModal = 'edit';
  }

  handleDelete(client: ClientDto) {
    this.selectedClient = client;
    this.activeModal = 'delete';
  }

  handleModalClose(updated: boolean = false) {
    this.closeModal();
    if (updated) {
      this.loadClients();
    }
  }

  confirmDelete() {
    if (!this.selectedClient) {
      this.snackBar.open('Cliente inválido para exclusão.', 'Fechar', snackBarErrorConfig);
      return;
    }

    this.clientService.deleteClient(this.selectedClient.id).subscribe({
        next: () => {
          this.snackBar.open('Cliente excluído com sucesso!', 'Fechar', snackBarSuccessConfig);
          this.loadClients();
          this.closeModal();
        },
        error: (err) => {
          this.snackBar.open(this.getErrorMessage(err), 'Fechar', snackBarErrorConfig);
        },
      });
  }

  closeModal() {
    this.activeModal = null;
    this.selectedClient = null;
  }

  getStoreNames(unitIds: number[]): string {
    if (!unitIds?.length) {
      return '-';
    }

    return unitIds.map((unitId) => this.storeMap[unitId] ?? `Loja ${unitId}`).join(', ');
  }

  private applyFiltersAndSearch(): void {
    const filteredClients = this.allClients.filter((client) => {
      const matchesStore = this.filters.unitId == null || client.unitIds?.includes(this.filters.unitId);

      if (!matchesStore) {
        return false;
      }

      if (!this.searchTerm) {
        return true;
      }

      const address = `${client.addressStreet} ${client.addressNumber} ${client.addressDistrict} ${client.addressCity} ${client.addressState} ${client.addressZip}`;
      const searchableValues = [
        client.name,
        client.cpfCnpj,
        this.getStoreNames(client.unitIds),
        client.addressCity,
        client.addressDistrict,
        client.email,
        client.phone,
        address,
      ];

      return searchableValues.some((item) => String(item ?? '').toLowerCase().includes(this.searchTerm));
    });

    this.clientList = this.sortClients(filteredClients);
    this.applyPagination();
  }

  private sortClients(clients: ClientDto[]): ClientDto[] {
    if (!this.sortColumn) {
      return [...clients];
    }

    const sortColumn = this.sortColumn;
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    return [...clients].sort((firstClient, secondClient) => {
      const firstValue = this.getSortableValue(firstClient, sortColumn);
      const secondValue = this.getSortableValue(secondClient, sortColumn);

      return this.compareValues(firstValue, secondValue) * direction;
    });
  }

  private getSortableValue(client: ClientDto, sortColumn: ClientSortKey): string {
    switch (sortColumn) {
      case 'name':
        return client.name ?? '';
      case 'cpfCnpj':
        return client.cpfCnpj ?? '';
      case 'stores':
        return this.getStoreNames(client.unitIds);
      case 'addressCity':
        return client.addressCity ?? '';
      case 'addressDistrict':
        return client.addressDistrict ?? '';
      case 'email':
        return client.email ?? '';
      case 'phone':
        return client.phone ?? '';
      default:
        return '';
    }
  }

  private compareValues(firstValue: string, secondValue: string): number {
    return firstValue.localeCompare(secondValue, 'pt-BR', {
      numeric: true,
      sensitivity: 'base',
    });
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'string' && error.trim()) {
      return error.trim();
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string; errors?: Record<string, string[]> } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        return apiError.error.trim();
      }

      if (apiError.error && typeof apiError.error === 'object') {
        if (apiError.error.message?.trim()) {
          return apiError.error.message.trim();
        }

        const validationMessage = Object.values(apiError.error.errors ?? {})
          .flat()
          .find((message) => message?.trim());

        if (validationMessage) {
          return validationMessage;
        }
      }

      if (apiError.message?.trim()) {
        return apiError.message.trim();
      }
    }

    return 'Erro ao excluir cliente.';
  }
}

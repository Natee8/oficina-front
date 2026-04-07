import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditClientModalComponent } from '../popupEdit/popupEdit.component';
import { ClientService } from '../../service/client.service';
import { ClientDto } from '../../model/dtos/client.dto';
import { columnsClient } from '../../../../core/config/columnsTable';

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
export class TableClients implements OnInit {
  page = 1;
  pageSize = 5;
  totalPages = 1;

  clientList: ClientDto[] = [];
  paginatedClients: ClientDto[] = [];
  columns = columnsClient;

  activeModal: 'edit' | 'delete' | null = null;
  selectedClient: ClientDto | null = null;
  @Input() filters!: { unitId: number | null };

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getCustomers().subscribe({
      next: (clients) => {
        this.clientList = clients;
        this.applyPagination();
      },
      error: (err) => {
        console.error('Erro ao buscar clientes:', err);
        this.clientList = [];
        this.paginatedClients = [];
        this.totalPages = 1;
      },
    });
  }

  applyPagination() {
    this.totalPages = Math.max(1, Math.ceil(this.clientList.length / this.pageSize));
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
    const searchTerm = value.trim().toLowerCase();

    const filteredClients = !searchTerm
      ? [...this.clientList]
      : this.clientList.filter((client) => {
          const address =
            `${client.addressStreet} ${client.addressNumber} ${client.addressDistrict} ${client.addressCity} ${client.addressState} ${client.addressZip}`.toLowerCase();
          return (
            client.name.toLowerCase().includes(searchTerm) ||
            client.email.toLowerCase().includes(searchTerm) ||
            client.phone.toLowerCase().includes(searchTerm) ||
            address.includes(searchTerm)
          );
        });

    this.clientList = filteredClients;
    this.page = 1;
    this.applyPagination();
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
    if (!this.selectedClient) return;

    this.clientService
      .deleteClient(this.selectedClient.id, this.selectedClient.unitIds ?? [])
      .subscribe({
        next: () => {
          console.log('Cliente deletado com sucesso');
          this.loadClients();
          this.closeModal();
        },
        error: (err) => console.error('Erro ao deletar cliente', err),
      });
  }

  closeModal() {
    this.activeModal = null;
    this.selectedClient = null;
  }
}

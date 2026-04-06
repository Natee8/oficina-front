import { Component, OnInit } from '@angular/core';
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
  constructor(private clientService: ClientService) {}
  page = 1;
  totalPages = 5;
  pageSize = 5;

  activeModal: 'edit' | 'delete' | null = null;
  selectedOs: any = null;
  selectedClient: any;

  clientList: ClientDto[] = [];
  columns = columnsClient;

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  handleEdit(client: ClientDto) {
    this.selectedClient = { ...client };
    this.activeModal = 'edit';
  }

  loadClients() {
    this.clientService.getCustomers().subscribe({
      next: (clients) => {
        console.log('CLIENTES DA API:', clients);
        this.clientList = clients;
      },
      error: (err) => {
        console.error('Erro ao buscar clientes:', err);
      },
    });
  }

  onClientUpdated() {
    this.loadClients();
  }

  handleDelete(client: ClientDto) {
    this.selectedClient = client;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    if (!this.selectedClient) return;

    const unitIds = this.selectedClient.unitIds ?? [];

    this.clientService.deleteClient(this.selectedClient.id, unitIds).subscribe({
      next: () => {
        console.log('Cliente deletado com sucesso');

        this.loadClients();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao deletar cliente', err);
      },
    });
  }

  closeModal() {
    this.activeModal = null;
    this.selectedOs = null;
    this.selectedClient = null;
  }
  ngOnInit() {
    this.loadClients();
  }
}

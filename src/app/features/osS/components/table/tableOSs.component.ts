import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditOsModalComponent } from '../popupEdit/popupEdit.component';
import { DropdownActions } from '../buttonDropdown/dropdown.component';
import { StatusModalComponent } from '../modelStatus/modelStatus.component';
import { OsService } from '../../service/os.service';
import { OsDto } from '../../model/dtos/os.dto';

const OsColumns = [
  { label: 'ID' },
  { label: 'Loja' },
  { label: 'Valor' },
  { label: 'Placa' },
  { label: 'Cliente' },
  { label: 'Status' },
  { label: 'Ações' },
];
@Component({
  selector: 'app-table-os',
  standalone: true,
  templateUrl: './tableOSs.component.html',
  styleUrls: ['./tableOSs.component.scss'],
  imports: [
    CommonModule,
    TableHeaderComponent,
    TableFooterComponent,
    ModalDelete,
    EditOsModalComponent,
    DropdownActions,
    StatusModalComponent,
  ],
  providers: [OsService],
})
export class TableOs implements OnInit {
  page = 1;
  totalPages = 5;
  pageSize = 5;
  selectedOs: any = null;
  activeModal: 'edit' | 'delete' | 'status' | null = null;

  lojas: any[] = [];
  clientes: any[] = [];
  veiculos: any[] = [];

  columns = OsColumns;
  osList: OsDto[] = [];
  loading = false;
  error = '';

  constructor(private osService: OsService) {}

  ngOnInit() {
    this.loading = true;
    this.osService.getServiceOrders().subscribe({
      next: (data) => {
        this.osList = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar OSs';
        this.loading = false;
      }
    });
  }

  alterarStatus(os: any) {
    this.selectedOs = os;
    this.activeModal = 'status';
  }

  updateStatus(newStatus: string) {
    if (this.selectedOs) {
      this.selectedOs.status = newStatus;
    }

    this.closeModal();
  }

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  baixarDocumento(os: any) {}

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

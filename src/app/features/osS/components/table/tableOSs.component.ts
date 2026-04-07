import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditOsModalComponent } from '../popupEdit/popupEdit.component';
import { DropdownActions } from '../buttonDropdown/dropdown.component';
import { StatusModalComponent } from '../modelStatus/modelStatus.component';
import { OsService } from '../../service/os.service';
import { OsDto } from '../../model/dtos/os.dto';
import { StatusOs } from '../../model/types/status';
import {
  snackBarErrorConfig,
  snackBarSuccessConfig,
} from '../../../../core/config/snackbar.config';

type OsSortKey =
  | 'id'
  | 'unitName'
  | 'totalAmount'
  | 'vehiclePlate'
  | 'ownerCustomerName'
  | 'statusName';
type SortDirection = 'asc' | 'desc';

const OsColumns = [
  { label: 'ID', sortKey: 'id' as OsSortKey },
  { label: 'Loja', sortKey: 'unitName' as OsSortKey },
  { label: 'Valor', sortKey: 'totalAmount' as OsSortKey },
  { label: 'Placa', sortKey: 'vehiclePlate' as OsSortKey },
  { label: 'Cliente', sortKey: 'ownerCustomerName' as OsSortKey },
  { label: 'Status', sortKey: 'statusName' as OsSortKey },
  { label: 'Ações', sortKey: null },
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
export class TableOs implements OnInit, OnChanges {
  page = 1;
  totalPages = 1;
  pageSize = 5;
  selectedOs: OsDto | null = null;
  activeModal: 'edit' | 'delete' | 'status' | null = null;

  lojas: any[] = [];
  clientes: any[] = [];
  veiculos: any[] = [];

  columns = OsColumns;
  osList: OsDto[] = [];
  allOsList: OsDto[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  sortColumn: OsSortKey | null = null;
  sortDirection: SortDirection = 'asc';

  @Input() filters: { unitId: number | null } = {
    unitId: null,
  };

  constructor(
    private osService: OsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.page = 1;
      this.loadOs();
    }
  }

  normalizeStatus(status: string | null | undefined): StatusOs | '' {
    if (!status) return '';

    const normalized = status
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (normalized === 'enviado' || normalized === 'feito' || normalized === 'finalizado') {
      return normalized;
    }

    return '';
  }

  loadOs() {
    this.loading = true;

    this.osService.getServiceOrders(this.filters).subscribe({
      next: (data) => {
        this.allOsList = data;
        this.applyFiltersAndSearch();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar OSs';
        this.allOsList = [];
        this.osList = [];
        this.totalPages = 1;
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.loadOs();
  }

  alterarStatus(os: OsDto) {
    this.selectedOs = os;
    this.activeModal = 'status';
  }

  updateStatus(newStatus: string) {
    if (!this.selectedOs?.id) {
      this.closeModal();
      return;
    }

    const normalizedStatus = this.normalizeStatus(newStatus);

    if (!normalizedStatus) {
      this.closeModal();
      return;
    }

    const statusLabelMap: Record<StatusOs, string> = {
      enviado: 'Enviado',
      feito: 'Feito',
      finalizado: 'Finalizado',
    };

    this.osService.patchServiceOrderStatus(this.selectedOs.id, normalizedStatus).subscribe({
      next: () => {
        this.allOsList = this.allOsList.map((os) =>
          os.id === this.selectedOs?.id
            ? {
                ...os,
                statusCode: normalizedStatus,
                statusName: statusLabelMap[normalizedStatus],
              }
            : os,
        );
        this.applyFiltersAndSearch();
        this.snackBar.open('Status da OS atualizado com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.closeModal();
      },
      error: (err) => {
        this.error = 'Erro ao alterar status da OS';
        this.snackBar.open(err?.error?.message || this.error, 'Fechar', snackBarErrorConfig);
        this.closeModal();
      },
    });
  }

  handleSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    this.page = 1;
    this.applyFiltersAndSearch();
  }

  toggleSort(column: { label: string; sortKey: OsSortKey | null }): void {
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

  getSortIndicator(column: { label: string; sortKey: OsSortKey | null }): string {
    if (!column.sortKey || this.sortColumn !== column.sortKey) {
      return '';
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  get paginatedOsList(): OsDto[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.osList.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  private getPdfFileName(contentDisposition: string | null, osId: number): string {
    const fallback = `os-${osId}.pdf`;

    if (!contentDisposition) {
      return fallback;
    }

    const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) {
      return decodeURIComponent(utf8Match[1]);
    }

    const quotedMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
    return quotedMatch?.[1] ?? fallback;
  }

  baixarDocumento(os: OsDto) {
    if (!os.id) {
      this.error = 'OS inválida para download';
      return;
    }

    this.osService.getServiceOrderPdf(os.id).subscribe({
      next: (response) => {
        const fileName = this.getPdfFileName(response.headers.get('content-disposition'), os.id);
        const blob = response.body;

        if (!blob) {
          this.error = 'PDF da OS não retornado pelo servidor';
          return;
        }

        const fileUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = fileUrl;
        anchor.download = fileName;
        anchor.click();
        window.URL.revokeObjectURL(fileUrl);
        this.snackBar.open('Documento baixado com sucesso!', 'Fechar', snackBarSuccessConfig);
      },
      error: (err) => {
        this.error = 'Erro ao baixar PDF da OS';
        this.snackBar.open(
          err?.error?.message || 'Erro ao baixar documento da OS',
          'Fechar',
          snackBarErrorConfig,
        );
      },
    });
  }

  handleEdit(os: OsDto) {
    this.selectedOs = os;
    this.activeModal = 'edit';
  }

  handleDelete(os: OsDto) {
    this.selectedOs = os;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    if (!this.selectedOs?.id) {
      this.closeModal();
      return;
    }

    const selectedId = this.selectedOs.id;

    this.osService.deleteServiceOrder(selectedId).subscribe({
      next: () => {
        this.allOsList = this.allOsList.filter((os) => os.id !== selectedId);
        this.applyFiltersAndSearch();
        this.snackBar.open('OS excluída com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.closeModal();
      },
      error: (err) => {
        this.error = 'Erro ao excluir OS';
        this.snackBar.open(
          err?.error?.message || 'Erro ao excluir OS',
          'Fechar',
          snackBarErrorConfig,
        );
      },
    });
  }

  closeModal() {
    this.activeModal = null;
    this.selectedOs = null;
  }

  private applyFiltersAndSearch(): void {
    const filteredOrders = this.allOsList.filter((os) => {
      const matchesStore = true;

      if (!matchesStore) {
        return false;
      }

      if (!this.searchTerm) {
        return true;
      }

      const searchableValues = [
        os.id,
        os.unitName,
        os.totalAmount,
        os.vehiclePlate,
        os.ownerCustomerName,
        os.statusName,
      ];

      return searchableValues.some((item) =>
        String(item ?? '')
          .toLowerCase()
          .includes(this.searchTerm),
      );
    });

    this.osList = this.sortServiceOrders(filteredOrders);
    this.totalPages = Math.max(1, Math.ceil(this.osList.length / this.pageSize));
    this.page = Math.min(this.page, this.totalPages);
  }

  private sortServiceOrders(orders: OsDto[]): OsDto[] {
    if (!this.sortColumn) {
      return [...orders];
    }

    const sortColumn = this.sortColumn;
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    return [...orders].sort((firstOrder, secondOrder) => {
      const firstValue = this.getSortableValue(firstOrder, sortColumn);
      const secondValue = this.getSortableValue(secondOrder, sortColumn);

      return this.compareValues(firstValue, secondValue) * direction;
    });
  }

  private getSortableValue(order: OsDto, column: OsSortKey): string | number {
    switch (column) {
      case 'id':
        return order.id;
      case 'unitName':
        return order.unitName ?? '';
      case 'totalAmount':
        return order.totalAmount ?? 0;
      case 'vehiclePlate':
        return order.vehiclePlate ?? '';
      case 'ownerCustomerName':
        return order.ownerCustomerName ?? '';
      case 'statusName':
        return order.statusName ?? '';
      default:
        return '';
    }
  }

  private compareValues(firstValue: string | number, secondValue: string | number): number {
    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return firstValue - secondValue;
    }

    return String(firstValue ?? '').localeCompare(String(secondValue ?? ''), 'pt-BR', {
      numeric: true,
      sensitivity: 'base',
    });
  }
}

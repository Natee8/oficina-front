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
import { StatusOs } from '../../model/types/status';

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
  selectedOs: OsDto | null = null;
  activeModal: 'edit' | 'delete' | 'status' | null = null;

  lojas: any[] = [];
  clientes: any[] = [];
  veiculos: any[] = [];

  columns = OsColumns;
  osList: OsDto[] = [];
  loading = false;
  error = '';

  constructor(private osService: OsService) {}

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
        this.osList = this.osList.map((os) =>
          os.id === this.selectedOs?.id
            ? {
                ...os,
                statusCode: normalizedStatus,
                statusName: statusLabelMap[normalizedStatus],
              }
            : os
        );
        this.closeModal();
      },
      error: () => {
        this.error = 'Erro ao alterar status da OS';
      },
    });
  }

  handleSearch(value: string) {
    console.log('buscar:', value);
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
      },
      error: () => {
        this.error = 'Erro ao baixar PDF da OS';
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
        this.osList = this.osList.filter((os) => os.id !== selectedId);
        this.closeModal();
      },
      error: () => {
        this.error = 'Erro ao excluir OS';
      },
    });
  }

  closeModal() {
    this.activeModal = null;
    this.selectedOs = null;
  }
}

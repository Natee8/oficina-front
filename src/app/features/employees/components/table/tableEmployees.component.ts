import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditEmployeeModalComponent } from '../popupEdit/popupEdit.component';
import { EmployeeService } from '../../service/employeer.service';
import { EmployeeListItem, Unit } from '../../model/dtos/employerPayload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../../core/config/snackbar.config';

const EMPLOYEE_COLUMNS = [
  { label: 'Nome' },
  { label: 'Email' },
  { label: 'Telefone' },
  { label: 'Cargo' },
  { label: 'Status' },
  { label: 'Acesso Total' },
  { label: 'Lojas' },
  { label: 'Ações' },
];

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
export class TableEmployees implements OnInit {
  page = 1;
  totalPages = 1;
  pageSize = 5;
  activeModal: 'edit' | 'delete' | null = null;
  selectedEmployeer: EmployeeListItem | null = null;
  userList: EmployeeListItem[] = [];
  unitsMap: Record<number, string> = {};

  columns = EMPLOYEE_COLUMNS;

  @Input() store: any;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadUnits();
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.userList = employees;
        this.totalPages = Math.max(1, Math.ceil(this.userList.length / this.pageSize));
      },
      error: () => {
        this.userList = [];
        this.totalPages = 1;
      },
    });
  }

  private loadUnits(): void {
    this.employeeService.getUnits().subscribe({
      next: (units) => {
        this.unitsMap = units.reduce<Record<number, string>>((accumulator, unit: Unit) => {
          accumulator[unit.id] = unit.name;
          return accumulator;
        }, {});
      },
      error: () => {
        this.unitsMap = {};
      },
    });
  }

  getUnitNames(unitIds: number[]): string {
    if (!unitIds?.length) {
      return '-';
    }

    return unitIds.map((unitId) => this.unitsMap[unitId] ?? `Loja ${unitId}`).join(', ');
  }

  getStatusLabel(isActive: boolean): string {
    return isActive ? 'Ativo' : 'Inativo';
  }

  getAccessLabel(fullAccess: boolean): string {
    return fullAccess ? 'Sim' : 'Nao';
  }

  getRoleLabel(role: string): string {
    const roleMap: Record<string, string> = {
      admin: 'Administrador',
      employee: 'Funcionario',
    };

    return roleMap[role?.toLowerCase()] ?? role;
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'string' && error.trim()) {
      return error.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao excluir funcionário.';
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        return apiError.error.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao excluir funcionário.';
      }

      if (apiError.error && typeof apiError.error === 'object' && apiError.error.message?.trim()) {
        return apiError.error.message.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao excluir funcionário.';
      }

      if (apiError.message?.trim()) {
        return apiError.message.split('\n')[0].replace(/^.*?Exception:\s*/i, '').trim() || 'Erro ao excluir funcionário.';
      }
    }

    return 'Erro ao excluir funcionário.';
  }

  handleSearch(value: string) {
    console.log('buscar:', value);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  handleEdit(employee: EmployeeListItem) {
    this.selectedEmployeer = employee;
    this.activeModal = 'edit';
  }

  handleDelete(employee: EmployeeListItem) {
    this.selectedEmployeer = employee;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    if (!this.selectedEmployeer?.id) {
      this.snackBar.open('Funcionário inválido para exclusão.', 'Fechar', snackBarErrorConfig);
      this.closeModal();
      return;
    }

    this.employeeService.deleteEmployee(this.selectedEmployeer.id).subscribe({
      next: () => {
        this.snackBar.open('Funcionário excluído com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.closeModal();
        this.loadEmployees();
      },
      error: (err) => {
        this.snackBar.open(this.getErrorMessage(err), 'Fechar', snackBarErrorConfig);
        this.closeModal();
      },
    });
  }

  handleModalClose(updated: boolean) {
    this.closeModal();
    if (updated) {
      this.loadEmployees();
    }
  }

  closeModal() {
    this.activeModal = null;
    this.selectedEmployeer = null;
  }
}

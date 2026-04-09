import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditEmployeeModalComponent } from '../popupEdit/popupEdit.component';
import { EmployeeService } from '../../service/employeer.service';
import { EmployeeListItem, Unit } from '../../model/dtos/employerPayload';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  snackBarErrorConfig,
  snackBarSuccessConfig,
} from '../../../../core/config/snackbar.config';

type EmployeeSortKey =
  | 'name'
  | 'email'
  | 'phoneNumber'
  | 'role'
  | 'isActive'
  | 'fullAccess'
  | 'unitIds';
type SortDirection = 'asc' | 'desc';

const EMPLOYEE_COLUMNS = [
  { label: 'Nome', sortKey: 'name' as EmployeeSortKey },
  { label: 'Email', sortKey: 'email' as EmployeeSortKey },
  { label: 'Telefone', sortKey: 'phoneNumber' as EmployeeSortKey },
  { label: 'Cargo', sortKey: 'role' as EmployeeSortKey },
  { label: 'Status', sortKey: 'isActive' as EmployeeSortKey },
  { label: 'Acesso Total', sortKey: 'fullAccess' as EmployeeSortKey },
  { label: 'Lojas', sortKey: 'unitIds' as EmployeeSortKey },
  { label: 'Ações', sortKey: null },
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
export class TableEmployees implements OnInit, OnChanges {
  private readonly unitNamesMaxLength = 30;

  page = 1;
  totalPages = 1;
  pageSize = 5;
  activeModal: 'edit' | 'delete' | null = null;
  selectedEmployeer: EmployeeListItem | null = null;
  allUsers: EmployeeListItem[] = [];
  userList: EmployeeListItem[] = [];
  unitsMap: Record<number, string> = {};
  searchTerm = '';
  sortColumn: EmployeeSortKey | null = null;
  sortDirection: SortDirection = 'asc';

  columns = EMPLOYEE_COLUMNS;

  @Input() store: any;
  @Input() filters: { unitId: number[]; role: string | null } = {
    unitId: [],
    role: null,
  };

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadUnits();
    this.loadEmployees();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.page = 1;
      this.loadEmployees();
    }
  }

  private loadEmployees(): void {
    this.employeeService.getEmployees(this.filters).subscribe({
      next: (employees) => {
        this.allUsers = employees;
        this.applySearch();
      },
      error: () => {
        this.allUsers = [];
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
        this.applySearch();
      },
      error: () => {
        this.unitsMap = {};
        this.applySearch();
      },
    });
  }

  getUnitNames(unitIds: number[]): string {
    if (!unitIds?.length) {
      return '-';
    }

    const unitNames = unitIds
      .map((unitId) => this.unitsMap[unitId])
      .filter((unitName): unitName is string => Boolean(unitName));

    return unitNames.length ? unitNames.join(', ') : '-';
  }

  getTruncatedUnitNames(unitIds: number[]): string {
    const unitNames = this.getUnitNames(unitIds);

    if (unitNames.length <= this.unitNamesMaxLength) {
      return unitNames;
    }

    return `${unitNames.slice(0, this.unitNamesMaxLength)}...`;
  }

  getStatusLabel(isActive: boolean): string {
    return isActive ? 'Ativo' : 'Inativo';
  }

  getAccessLabel(fullAccess: boolean): string {
    return fullAccess ? 'Sim' : 'Nao';
  }

  getRoleLabel(role: string): string {
    const roleMap: Record<string, string> = {
      admin: 'Admin',
      administrador: 'Admin',
      employee: 'Comum',
      comum: 'Comum',
    };

    const normalizedRole = role?.trim().toLowerCase();

    if (normalizedRole && roleMap[normalizedRole]) {
      return roleMap[normalizedRole];
    }

    if (!role?.trim()) {
      return '-';
    }

    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  private getErrorMessage(error: unknown): string {
    if (typeof error === 'string' && error.trim()) {
      return (
        error
          .split('\n')[0]
          .replace(/^.*?Exception:\s*/i, '')
          .trim() || 'Erro ao excluir funcionário.'
      );
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        return (
          apiError.error
            .split('\n')[0]
            .replace(/^.*?Exception:\s*/i, '')
            .trim() || 'Erro ao excluir funcionário.'
        );
      }

      if (apiError.error && typeof apiError.error === 'object' && apiError.error.message?.trim()) {
        return (
          apiError.error.message
            .split('\n')[0]
            .replace(/^.*?Exception:\s*/i, '')
            .trim() || 'Erro ao excluir funcionário.'
        );
      }

      if (apiError.message?.trim()) {
        return (
          apiError.message
            .split('\n')[0]
            .replace(/^.*?Exception:\s*/i, '')
            .trim() || 'Erro ao excluir funcionário.'
        );
      }
    }

    return 'Erro ao excluir funcionário.';
  }
  get paginatedUsers(): EmployeeListItem[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.userList.slice(startIndex, startIndex + this.pageSize);
  }

  handleSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    this.page = 1;
    this.applySearch();
  }

  toggleSort(column: { label: string; sortKey: EmployeeSortKey | null }): void {
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
    this.applySearch();
  }

  getSortIndicator(column: { label: string; sortKey: EmployeeSortKey | null }): string {
    if (!column.sortKey || this.sortColumn !== column.sortKey) {
      return '';
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  private applySearch(): void {
    let filteredUsers = [...this.allUsers];

    if (this.filters.role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.role?.toLowerCase() === this.filters.role?.toLowerCase(),
      );
    }

    if (this.filters.unitId?.length) {
      filteredUsers = filteredUsers.filter((user) =>
        this.filters.unitId.every((filterId) => user.unitIds.includes(filterId)),
      );
    }

    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter((user) => {
        const searchableValues = [
          user.name,
          user.email,
          user.phoneNumber,
          this.getRoleLabel(user.role),
          this.getStatusLabel(user.isActive),
          this.getAccessLabel(user.fullAccess),
          this.getUnitNames(user.unitIds),
        ];

        return searchableValues.some((item) => item?.toLowerCase().includes(this.searchTerm));
      });

      this.totalPages = Math.max(1, Math.ceil(this.userList.length / this.pageSize));
      this.page = Math.min(this.page, this.totalPages);
    }

    this.userList = this.sortUsers(filteredUsers);
    this.totalPages = Math.max(1, Math.ceil(this.userList.length / this.pageSize));
  }

  private sortUsers(users: EmployeeListItem[]): EmployeeListItem[] {
    if (!this.sortColumn) {
      return users;
    }

    const sortColumn = this.sortColumn;
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    return [...users].sort((firstUser, secondUser) => {
      const firstValue = this.getSortableValue(firstUser, sortColumn);
      const secondValue = this.getSortableValue(secondUser, sortColumn);

      return this.compareValues(firstValue, secondValue) * direction;
    });
  }

  private getSortableValue(user: EmployeeListItem, column: EmployeeSortKey): string | number {
    switch (column) {
      case 'name':
        return user.name ?? '';
      case 'email':
        return user.email ?? '';
      case 'phoneNumber':
        return user.phoneNumber ?? '';
      case 'role':
        return this.getRoleLabel(user.role);
      case 'isActive':
        return this.getStatusLabel(user.isActive);
      case 'fullAccess':
        return this.getAccessLabel(user.fullAccess);
      case 'unitIds':
        return this.getUnitNames(user.unitIds);
      default:
        return '';
    }
  }

  private compareValues(firstValue: string | number, secondValue: string | number): number {
    const normalizedFirst = this.normalizeSortValue(firstValue);
    const normalizedSecond = this.normalizeSortValue(secondValue);

    const firstNumber = Number(normalizedFirst);
    const secondNumber = Number(normalizedSecond);
    const bothAreNumbers = !Number.isNaN(firstNumber) && !Number.isNaN(secondNumber);

    if (bothAreNumbers) {
      return firstNumber - secondNumber;
    }

    return normalizedFirst.localeCompare(normalizedSecond, 'pt-BR', {
      numeric: true,
      sensitivity: 'base',
    });
  }

  private normalizeSortValue(value: string | number): string {
    return String(value ?? '').trim();
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

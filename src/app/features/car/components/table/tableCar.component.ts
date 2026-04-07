import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableFooterComponent } from '../../../../shared/components/tableFooter/tableFooter.component';
import { TableHeaderComponent } from '../../../../shared/components/tableHeader/tableHeader.component';
import { TableActionsComponent } from '../../../../shared/components/buttonTable/buttonTable.component';
import { ModalDelete } from '../../../../shared/components/modalDelete/modalDelete.component';
import { EditCarModalComponent } from '../popupEdit/popupEdit.component';
import { VehicleDto } from '../../model/dtos/vehicle.dto';
import { VehicleService } from '../../service/car.service';
import {
  snackBarErrorConfig,
  snackBarSuccessConfig,
} from '../../../../core/config/snackbar.config';
import { ClientService } from '../../../clients/service/client.service';
import { ClientDto } from '../../../clients/model/dtos/client.dto';

type VehicleSortKey = 'customerName' | 'plate' | 'brand' | 'model' | 'year' | 'color' | 'renavam';
type SortDirection = 'asc' | 'desc';

const vehicleColumns = [
  { key: 'customerName', label: 'Cliente', sortKey: 'customerName' as VehicleSortKey },
  { key: 'plate', label: 'Placa', sortKey: 'plate' as VehicleSortKey },
  { key: 'brand', label: 'Marca', sortKey: 'brand' as VehicleSortKey },
  { key: 'model', label: 'Modelo', sortKey: 'model' as VehicleSortKey },
  { key: 'year', label: 'Ano', sortKey: 'year' as VehicleSortKey },
  { key: 'color', label: 'Cor', sortKey: 'color' as VehicleSortKey },
  { key: 'renavam', label: 'Renavam', sortKey: 'renavam' as VehicleSortKey },
  { key: 'actions', label: 'Ações', sortKey: null },
];

@Component({
  selector: 'app-table-car',
  standalone: true,
  templateUrl: './tableCar.component.html',
  styleUrls: ['./tableCar.component.scss'],
  imports: [
    CommonModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableActionsComponent,
    ModalDelete,
    EditCarModalComponent,
  ],
})
export class TableCar implements OnInit {
  page = 1;
  totalPages = 1;
  pageSize = 5;
  activeModal: 'edit' | 'delete' | null = null;
  selectedOs: VehicleDto | null = null;
  loading = false;
  error = '';
  columns = vehicleColumns;
  vehicles: VehicleDto[] = [];
  allVehicles: VehicleDto[] = [];
  customers: ClientDto[] = [];
  searchTerm = '';
  sortColumn: VehicleSortKey | null = null;
  sortDirection: SortDirection = 'asc';

  @Input() filters: { unitIds: number[] } = {
    unitIds: [],
  };

  constructor(
    private vehicleService: VehicleService,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.page = 1;
      this.loadVehicles();
    }
  }

  ngOnInit() {
    this.loadCustomers();
    this.loadVehicles();
  }

  private loadVehicles(): void {
    this.loading = true;

    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.allVehicles = vehicles;
        this.applyFiltersAndSearch();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar veículos';
        this.allVehicles = [];
        this.vehicles = [];
        this.totalPages = 1;
        this.loading = false;
      },
    });
  }
  private loadCustomers(): void {
    this.clientService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.applyFiltersAndSearch();
      },
      error: () => {
        this.customers = [];
        this.applyFiltersAndSearch();
      },
    });
  }

  handleSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
    this.page = 1;
    this.applyFiltersAndSearch();
  }

  toggleSort(column: { key: string; label: string; sortKey: VehicleSortKey | null }): void {
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

  getSortIndicator(column: { key: string; label: string; sortKey: VehicleSortKey | null }): string {
    if (!column.sortKey || this.sortColumn !== column.sortKey) {
      return '';
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  get paginatedVehicles(): VehicleDto[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.vehicles.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(newPage: number) {
    this.page = newPage;
  }

  handleEdit(vehicle: VehicleDto) {
    this.selectedOs = vehicle;
    this.activeModal = 'edit';
  }

  handleDelete(vehicle: VehicleDto) {
    this.selectedOs = vehicle;
    this.activeModal = 'delete';
  }

  confirmDelete() {
    if (!this.selectedOs?.id) {
      this.closeModal();
      return;
    }

    const selectedId = this.selectedOs.id;

    this.vehicleService.deleteVehicle(selectedId).subscribe({
      next: () => {
        this.allVehicles = this.allVehicles.filter((vehicle) => vehicle.id !== selectedId);
        this.applyFiltersAndSearch();
        this.snackBar.open('Veiculo excluido com sucesso!', 'Fechar', snackBarSuccessConfig);
        this.closeModal();
      },
      error: (err) => {
        this.error = 'Erro ao excluir veículo';
        this.snackBar.open(err?.error?.message || this.error, 'Fechar', snackBarErrorConfig);
      },
    });
  }

  handleVehicleUpdated(updatedVehicle: VehicleDto) {
    this.allVehicles = this.allVehicles.map((vehicle) =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle,
    );
    this.applyFiltersAndSearch();
    this.closeModal();
  }

  closeModal() {
    this.activeModal = null;
    this.selectedOs = null;
  }

  private applyFiltersAndSearch(): void {
    const filteredVehicles = this.allVehicles.filter((vehicle) => {
      // 👇 PRIMEIRO filtra por loja
      if (!this.matchesSelectedStore(vehicle)) {
        return false;
      }

      // 👇 depois aplica busca
      if (!this.searchTerm) {
        return true;
      }

      const searchableValues = [
        vehicle.customerName,
        vehicle.plate,
        vehicle.brand,
        vehicle.model,
        vehicle.year,
        vehicle.color,
        vehicle.renavam,
      ];

      return searchableValues.some((item) =>
        String(item ?? '')
          .toLowerCase()
          .includes(this.searchTerm),
      );
    });

    this.vehicles = this.sortVehicles(filteredVehicles);
    this.totalPages = Math.max(1, Math.ceil(this.vehicles.length / this.pageSize));
    this.page = Math.min(this.page, this.totalPages);
  }

  private matchesSelectedStore(vehicle: VehicleDto): boolean {
    if (!this.filters.unitIds?.length) return true;

    const customer = this.customers.find((item) => item.id === vehicle.customerId);

    return customer?.unitIds?.some((id) => this.filters.unitIds.includes(id)) ?? false;
  }

  private sortVehicles(vehicles: VehicleDto[]): VehicleDto[] {
    if (!this.sortColumn) {
      return [...vehicles];
    }

    const sortColumn = this.sortColumn;
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    return [...vehicles].sort((firstVehicle, secondVehicle) => {
      const firstValue = this.getSortableValue(firstVehicle, sortColumn);
      const secondValue = this.getSortableValue(secondVehicle, sortColumn);

      return this.compareValues(firstValue, secondValue) * direction;
    });
  }

  private getSortableValue(vehicle: VehicleDto, sortColumn: VehicleSortKey): string | number {
    switch (sortColumn) {
      case 'customerName':
        return vehicle.customerName ?? '';
      case 'plate':
        return vehicle.plate ?? '';
      case 'brand':
        return vehicle.brand ?? '';
      case 'model':
        return vehicle.model ?? '';
      case 'year':
        return vehicle.year ?? 0;
      case 'color':
        return vehicle.color ?? '';
      case 'renavam':
        return vehicle.renavam ?? '';
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

const vehicleColumns = [
  { key: 'customerName', label: 'Cliente' },
  { key: 'plate', label: 'Placa' },
  { key: 'brand', label: 'Marca' },
  { key: 'model', label: 'Modelo' },
  { key: 'year', label: 'Ano' },
  { key: 'color', label: 'Cor' },
  { key: 'renavam', label: 'Renavam' },
  { key: 'actions', label: 'Ações' },
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
  totalPages = 5;
  activeModal: 'edit' | 'delete' | null = null;
  selectedOs: VehicleDto | null = null;
  loading = false;
  error = '';
  columns = vehicleColumns;
  vehicles: VehicleDto[] = [];

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar veículos';
        this.loading = false;
      },
    });
  }

  handleSearch(value: string) {
    console.log('buscar:', value);
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
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== selectedId);
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
    this.vehicles = this.vehicles.map((vehicle) =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle,
    );
    this.closeModal();
  }

  closeModal() {
    this.activeModal = null;
    this.selectedOs = null;
  }
}

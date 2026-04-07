import { Component, OnInit } from '@angular/core';
import { TableCar } from '../../components/table/tableCar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../stores/service/store.service';
import { DropdownComponent } from '../../../../shared/components/dropdownField/dropdrown/dropownField.component';
import { ActionButtonComponent } from '../../../../shared/components/dropdownField/dropdownButtonFilter/buttonFilter.component';

type CarFilters = {
  unitIds: number[];
};

@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [TableCar, CommonModule, RouterModule, DropdownComponent, ActionButtonComponent],
})
export class CarComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];

  filterGroups: any[] = [];
  filters: CarFilters = { unitIds: [] };
  appliedFilters: CarFilters = { unitIds: [] };

  openDropdown = false;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (stores) => {
        this.lojasOptions = [
          { label: 'Todas', value: null },
          ...stores.map((store) => ({
            label: store.name,
            value: store.id,
          })),
        ];

        this.buildFilterGroups();
      },
      error: () => {
        this.lojasOptions = [{ label: 'Todas', value: null }];
        this.buildFilterGroups();
      },
    });
  }

  private buildFilterGroups() {
    this.filterGroups = [
      {
        title: 'Lojas',
        icon: 'fa-solid fa-store',
        key: 'unitIds',
        options: this.lojasOptions,
        multiple: true, // 👈 IMPORTANTE
      },
    ];
  }

  toggleDropdown(): void {
    this.openDropdown = !this.openDropdown;
  }

  closeDropdown(): void {
    this.openDropdown = false;
  }

  applyFilters(): void {
    this.appliedFilters = {
      unitIds: [...this.filters.unitIds],
    };
    this.closeDropdown();
  }

  clearFilters(): void {
    this.filters = { unitIds: [] };
    this.appliedFilters = { unitIds: [] };
    this.closeDropdown();
  }
}

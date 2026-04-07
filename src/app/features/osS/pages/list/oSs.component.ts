import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableOs } from '../../components/table/tableOSs.component';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../stores/service/store.service';
import { DropdownComponent } from '../../../../shared/components/dropdownField/dropdrown/dropownField.component';
import { ActionButtonComponent } from '../../../../shared/components/dropdownField/dropdownButtonFilter/buttonFilter.component';

type OsFilters = {
  unitId: number | null;
};

@Component({
  selector: 'app-oSs',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [TableOs, CommonModule, DropdownComponent, ActionButtonComponent],
})
export class OSsComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];

  filterGroups: any[] = [];

  filters: OsFilters = { unitId: null };
  appliedFilters: OsFilters = { unitId: null };

  openDropdown = false;

  constructor(
    private router: Router,
    private storeService: StoreService,
  ) {}

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
        key: 'unitId',
        options: this.lojasOptions,
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
      unitId: this.filters.unitId,
    };
    this.closeDropdown();
  }

  clearFilters(): void {
    this.filters = { unitId: null };
    this.appliedFilters = { unitId: null };
    this.closeDropdown();
  }

  goToCreate() {
    this.router.navigate(['/os-create']);
  }
}

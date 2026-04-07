import { Component, OnInit } from '@angular/core';
import { TableClients } from '../../components/table/tableClients.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../../../shared/components/dropdownField/dropdrown/dropownField.component';
import { ActionButtonComponent } from '../../../../shared/components/dropdownField/dropdownButtonFilter/buttonFilter.component';
import { ClientService } from '../../service/client.service';

type ClientFilters = {
  unitId: number | null;
};

@Component({
  selector: 'app-clients',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [TableClients, CommonModule, RouterModule, DropdownComponent, ActionButtonComponent],
})
export class ClientsComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];

  filterGroups: any[] = [];

  filters: ClientFilters = { unitId: null };
  appliedFilters: ClientFilters = { unitId: null };

  openDropdown = false;

  constructor(private clientService: ClientService) {}
  ngOnInit(): void {
    this.clientService.getLojas().subscribe({
      next: (units) => {
        this.lojasOptions = [
          { label: 'Todas', value: null },
          ...units.map((unit) => ({
            label: unit.name,
            value: unit.id,
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
}

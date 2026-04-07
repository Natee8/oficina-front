import { Component, OnInit } from '@angular/core';
import { TableEmployees } from '../../components/table/tableEmployees.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employeer.service';
import { DropdownComponent } from '../../../../shared/components/dropdownField/dropdrown/dropownField.component';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../../../../shared/components/dropdownField/dropdownButtonFilter/buttonFilter.component';

type EmployeeFilters = {
  unitId: number | null;
  role: string | null;
};

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [
    TableEmployees,
    CommonModule,
    RouterModule,
    FormsModule,
    DropdownComponent,
    ActionButtonComponent,
  ],
})
export class EmployeesComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];

  cargosOptions: Array<{ label: string; value: string | null }> = [
    { label: 'Todos', value: null },
    { label: 'Administrador', value: 'Admin' },
    { label: 'Comum', value: 'Comum' },
  ];

  filterGroups: any[] = [];

  filters: EmployeeFilters = { unitId: null, role: null };
  appliedFilters: EmployeeFilters = { unitId: null, role: null };

  openDropdown = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getUnits().subscribe({
      next: (units) => {
        this.lojasOptions = [
          { label: 'Todas', value: null },
          ...units.map((unit) => ({ label: unit.name, value: unit.id })),
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
      {
        title: 'Cargos',
        icon: 'fa-solid fa-user-tie',
        key: 'role',
        options: this.cargosOptions,
      },
    ];
  }

  clearFilters(): void {
    this.filters = { unitId: null, role: null };
    this.appliedFilters = { unitId: null, role: null };
    this.closeDropdown();
  }

  closeDropdown(): void {
    this.openDropdown = false;
  }

  toggleDropdown(): void {
    this.openDropdown = !this.openDropdown;
  }

  applyFilters(): void {
    this.appliedFilters = {
      unitId: this.filters.unitId,
      role: this.filters.role,
    };
    this.closeDropdown();
  }
}

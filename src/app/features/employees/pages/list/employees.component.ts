import { Component, OnInit } from '@angular/core';
import { TableEmployees } from '../../components/table/tableEmployees.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employeer.service';
import { DropdownComponent } from '../../../../shared/components/dropdownField/dropdrown/dropownField.component';
import { CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../../../../shared/components/dropdownField/dropdownButtonFilter/buttonFilter.component';

type EmployeeFilters = {
  unitId: number[]; // múltiplas lojas
  role: string | null; // apenas uma role
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
  filters: { unitId: number[]; role: string[] } = { unitId: [], role: [] }; // temporário para seleção
  appliedFilters: EmployeeFilters = { unitId: [], role: null };
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

  closeDropdown(): void {
    this.openDropdown = false;
  }

  toggleDropdown(): void {
    this.openDropdown = !this.openDropdown;
  }

  applyFilters(): void {
    if (this.filters.role.length > 1) {
      alert('Só é permitido filtrar por uma Cargo de cada vez.');
      return;
    }

    this.appliedFilters = {
      unitId: [...this.filters.unitId],
      role: this.filters.role[0] ?? null,
    };

    this.closeDropdown();

    this.employeeService.getEmployees(this.appliedFilters).subscribe({
      next: (employees) => {},
    });
  }

  clearFilters(): void {
    this.filters = { unitId: [], role: [] };
    this.appliedFilters = { unitId: [], role: null };
    this.closeDropdown();
  }
}

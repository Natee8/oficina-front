import { Component, OnInit } from '@angular/core';
import { TableEmployees } from '../../components/table/tableEmployees.component';
import { RouterModule } from '@angular/router';
import { SelectFieldComponent } from '../../../../shared/components/inputs/select/selectField.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employeer.service';
import { DropdownComponent } from '../../../../shared/components/dropdownField/dropownField.component';
import { CommonModule } from '@angular/common';

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
    SelectFieldComponent,
    FormsModule,
    DropdownComponent,
  ],
})
export class EmployeesComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];
  cargosOptions: Array<{ label: string; value: string | null }> = [
    { label: 'Todos', value: null },
    { label: 'Administrador', value: 'Admin' },
    { label: 'Comum', value: 'Comum' },
  ];

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
      },
      error: () => {
        this.lojasOptions = [{ label: 'Todas', value: null }];
      },
    });
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
      role: this.filters.role,
    };
    this.closeDropdown();
  }
}

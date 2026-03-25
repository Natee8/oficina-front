import { Component } from '@angular/core';
import { TableEmployees } from '../../components/table/tableEmployees.component';
import { RouterModule } from '@angular/router';
import { SelectFieldComponent } from "../../../../shared/components/inputs/select/selectField.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [TableEmployees, RouterModule, SelectFieldComponent],
})
export class EmployeesComponent {}

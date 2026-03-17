import { Component } from '@angular/core';
import { TableEmployees } from '../components/table/table.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  imports: [TableEmployees],
})
export class EmployeesComponent {}

import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/select/selectField.component';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../service/employeer.service';
import { Unit } from '../../../model/dtos/employerPayload';
import { EmployeeData } from '../../../model/dtos/employer.data';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent],
  templateUrl: './stepThree.component.html',
})
export class StepThreeComponent implements OnInit {
  @Input() data!: EmployeeData;
  @Input() errors: Record<string, string> = {};

  cargosOptions = ['Funcionário', 'Administrador'];
  lojasOptions: Unit[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadLojas();
  }
  get lojasOptionsSelect() {
    return this.lojasOptions.map((u) => ({ label: u.name, value: u.id }));
  }

  loadLojas() {
    this.employeeService.getUnits().subscribe({
      next: (units) => (this.lojasOptions = units),
      error: (err) => console.error('Erro ao carregar lojas', err),
    });
  }
}

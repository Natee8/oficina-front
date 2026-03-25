import { Component } from '@angular/core';
import { TableCar } from '../../components/table/tableCar.component';
import { RouterModule } from '@angular/router';
import { SelectFieldComponent } from "../../../../shared/components/inputs/select/selectField.component";
import { InputFieldComponent } from "../../../../shared/components/inputs/field/inputField.component";

@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [TableCar, RouterModule, SelectFieldComponent, InputFieldComponent],
})
export class CarComponent {}

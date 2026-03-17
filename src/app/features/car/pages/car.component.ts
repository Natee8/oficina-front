import { Component } from '@angular/core';
import { TableCar } from '../components/table/tableCar.component';

@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [TableCar],
})
export class CarComponent {}

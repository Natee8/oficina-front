import { Component } from '@angular/core';
import { TableCar } from '../../components/table/tableCar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [TableCar, RouterModule],
})
export class CarComponent {}

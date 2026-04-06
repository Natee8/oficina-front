import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableCar } from '../../components/table/tableCar.component';
import { RouterModule } from '@angular/router';
import { SelectFieldComponent } from '../../../../shared/components/inputs/select/selectField.component';
import { StoreService } from '../../../stores/service/store.service';

type CarFilters = {
  unitId: number | null;
};

@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [TableCar, RouterModule, SelectFieldComponent, FormsModule],
})
export class CarComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];

  filters: CarFilters = {
    unitId: null,
  };

  appliedFilters: CarFilters = {
    unitId: null,
  };

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (stores) => {
        this.lojasOptions = [
          { label: 'Todas', value: null },
          ...stores.map((store) => ({ label: store.name, value: store.id })),
        ];
      },
      error: () => {
        this.lojasOptions = [{ label: 'Todas', value: null }];
      },
    });
  }

  applyFilters(): void {
    this.appliedFilters = {
      unitId: this.filters.unitId,
    };
  }
}

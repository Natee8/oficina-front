import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableClients } from '../../components/table/tableClients.component';
import { RouterModule } from '@angular/router';
import { SelectFieldComponent } from '../../../../shared/components/inputs/select/selectField.component';
import { StoreService } from '../../../stores/service/store.service';

type ClientFilters = {
  unitId: number | null;
};

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [TableClients, RouterModule, SelectFieldComponent, FormsModule],
})
export class ClientsComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];

  filters: ClientFilters = {
    unitId: null,
  };

  appliedFilters: ClientFilters = {
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

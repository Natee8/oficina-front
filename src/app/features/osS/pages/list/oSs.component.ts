import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableOs } from '../../components/table/tableOSs.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/select/selectField.component';
import { StoreService } from '../../../stores/service/store.service';

type OsFilters = {
  unitId: number | null;
};

@Component({
  selector: 'app-oSs',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [TableOs, SelectFieldComponent, FormsModule],
})
export class OSsComponent implements OnInit {
  lojasOptions: Array<{ label: string; value: number | null }> = [{ label: 'Todas', value: null }];

  filters: OsFilters = {
    unitId: null,
  };

  appliedFilters: OsFilters = {
    unitId: null,
  };

  constructor(
    private router: Router,
    private storeService: StoreService,
  ) {}

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

  goToCreate() {
    this.router.navigate(['/os-create']);
  }

  applyFilters(): void {
    this.appliedFilters = {
      unitId: this.filters.unitId,
    };
  }
}

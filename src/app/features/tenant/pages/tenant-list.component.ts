import { Component, OnInit } from '@angular/core';
import { formatCnpj } from '../../../shared/utils/masks/formatCnpj';
import { onlyNumbers } from '../../../shared/functions/functionRemoveMask';
import { InputFieldComponent } from './../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../services/tenant.service';
import { TenantDto } from '../model/tenant.dto';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [InputFieldComponent, FormsModule],
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss'],
  providers: [TenantService],
})
export class TenantListComponent implements OnInit {
  displayTenantName: string = '';

  editTenantName: string = '';
  editCnpj: string = '';

  loading = false;
  error = '';

  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    this.loading = true;
    this.tenantService.getTenant().subscribe({
      next: (tenant: TenantDto) => {
        this.displayTenantName = tenant.name;
        this.editTenantName = tenant.name;
        this.editCnpj = formatCnpj(tenant.cnpj);
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar dados da empresa';
        this.loading = false;
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.tenantService
      .updateTenant({
        name: this.editTenantName,
        cnpj: onlyNumbers(this.editCnpj),
      })
      .subscribe({
        next: () => {
          this.displayTenantName = this.editTenantName;
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro ao atualizar empresa';
          this.loading = false;
        },
      });
  }
}

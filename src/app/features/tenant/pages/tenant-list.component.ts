import { Component, OnInit } from '@angular/core';
import { formatCnpj } from '../../../shared/utils/masks/formatCnpj';
import { onlyNumbers } from '../../../shared/functions/functionRemoveMask';
import { InputFieldComponent } from './../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../services/tenant.service';
import { TenantDto } from '../model/tenant.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarErrorConfig, snackBarSuccessConfig } from '../../../core/config/snackbar.config';

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

  constructor(
    private tenantService: TenantService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.tenantService.getTenant().subscribe({
      next: (tenant: TenantDto) => {
        this.displayTenantName = tenant.name;
        this.editTenantName = tenant.name;
        this.editCnpj = formatCnpj(tenant.cnpj);
        this.loading = false;
      },
      error: (err) => {
        this.error = this.getErrorMessage(err, 'Erro ao carregar dados da empresa.');
        this.snackBar.open(this.error, 'Fechar', snackBarErrorConfig);
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
          this.snackBar.open('Empresa atualizada com sucesso!', 'Fechar', snackBarSuccessConfig);
          this.loading = false;
        },
        error: (err) => {
          this.error = this.getErrorMessage(err, 'Erro ao atualizar empresa.');
          this.snackBar.open(this.error, 'Fechar', snackBarErrorConfig);
          this.loading = false;
        },
      });
  }

  private getErrorMessage(error: unknown, fallbackMessage: string): string {
    if (typeof error === 'string' && error.trim()) {
      return error.trim();
    }

    if (error && typeof error === 'object') {
      const apiError = error as {
        error?: { message?: string; errors?: Record<string, string[]> } | string;
        message?: string;
      };

      if (typeof apiError.error === 'string' && apiError.error.trim()) {
        return apiError.error.trim();
      }

      if (apiError.error && typeof apiError.error === 'object') {
        if (apiError.error.message?.trim()) {
          return apiError.error.message.trim();
        }

        const validationMessage = Object.values(apiError.error.errors ?? {})
          .flat()
          .find((message) => message?.trim());

        if (validationMessage) {
          return validationMessage;
        }
      }

      if (apiError.message?.trim()) {
        return apiError.message.trim();
      }
    }

    return fallbackMessage;
  }
}

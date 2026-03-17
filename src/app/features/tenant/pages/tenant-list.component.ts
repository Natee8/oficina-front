import { Component } from '@angular/core';
import { InputFieldComponent } from "./../../../shared/components/inputs/field/inputField.component";

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [InputFieldComponent],
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent {
  tenantName: string = '';
  cnpj: string = '';
}

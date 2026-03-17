import { Component } from '@angular/core';
import { InputFieldComponent } from "./../../../shared/components/inputs/field/inputField.component";
import { TableActionsComponent } from "./../../../shared/components/buttonTable/buttonTable.component";

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [InputFieldComponent, TableActionsComponent],
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent {
  empresaNome: string = '';
  cnpj: string = '';
}

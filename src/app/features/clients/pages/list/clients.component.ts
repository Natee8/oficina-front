import { Component } from '@angular/core';
import { TableClients } from '../../components/table/tableClients.component'; 
import { RouterModule } from '@angular/router';
import { SelectFieldComponent } from "../../../../shared/components/inputs/select/selectField.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [TableClients, RouterModule, SelectFieldComponent],
})
export class ClientsComponent {}

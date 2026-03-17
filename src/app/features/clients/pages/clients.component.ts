import { Component } from '@angular/core';
import { TableClients } from '../components/tableClients.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [TableClients],
})
export class ClientsComponent {}

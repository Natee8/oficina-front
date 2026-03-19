import { Component } from '@angular/core';
import { TableClients } from '../../components/table/tableClients.component'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [TableClients, RouterModule],
})
export class ClientsComponent {}

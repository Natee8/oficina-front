import { Component } from '@angular/core';
import { TableOs } from '../components/table/tableOSs.component';

@Component({
  selector: 'app-oSs',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [TableOs],
})
export class OSsComponent {}

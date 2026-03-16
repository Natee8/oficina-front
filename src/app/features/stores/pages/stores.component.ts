import { Component } from '@angular/core';
import { TableStores } from "../components/table/tableStores.component";

@Component({
  selector: 'app-stores',
  standalone: true,
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  imports: [TableStores],
})
export class StoresComponent {}

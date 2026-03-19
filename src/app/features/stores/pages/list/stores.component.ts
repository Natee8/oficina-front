import { Component } from '@angular/core';
import { TableStores } from "../../components/table/tableStores.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stores',
  standalone: true,
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  imports: [TableStores, RouterModule],
})
export class StoresComponent {}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableOs } from '../../components/table/tableOSs.component';

@Component({
  selector: 'app-oSs',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [TableOs],
})
export class OSsComponent {
  constructor(private router: Router) {}

  goToCreate() {
    this.router.navigate(['/os-create']);
  }
}

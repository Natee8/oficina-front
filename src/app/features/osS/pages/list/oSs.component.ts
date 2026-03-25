
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableOs } from '../../components/table/tableOSs.component';
import { InputFieldComponent } from "../../../../shared/components/inputs/field/inputField.component";
import { SelectFieldComponent } from "../../../../shared/components/inputs/select/selectField.component";

@Component({
  selector: 'app-oSs',
  standalone: true,
  templateUrl: './oSs.component.html',
  styleUrls: ['./oSs.component.scss'],
  imports: [TableOs, InputFieldComponent, SelectFieldComponent],
})
export class OSsComponent {
  constructor(private router: Router) {}

  goToCreate() {
    this.router.navigate(['/os-create']);
  }
}

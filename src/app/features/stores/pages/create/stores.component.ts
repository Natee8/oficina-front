import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { Router } from '@angular/router';
import { RegisterCardComponent } from "../../../../layout/CardCreateLayout/register-card.component";

@Component({
  selector: 'app-create-store',
  standalone: true,
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  imports: [CommonModule, FormsModule, InputFieldComponent, BackButtonComponent, RegisterCardComponent],
})
export class CreateStoreComponent {
  step = 1;
  name = '';
  cnpj = '';
  addressZip = '';
  addressStreet = '';
  addressNumber = '';
  addressDistrict = '';
  addressCity = '';
  addressState = '';

  constructor(private router: Router) {}

  goBackStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  goBackList() {
    this.router.navigate(['/stores-list']);
  }

  nextStep() {
    if (this.step < 2) {
      this.step++;
    }
  }

  submit() {
    // lógica de envio do formulário
  }
}

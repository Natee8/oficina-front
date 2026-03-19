import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { RegisterCardComponent } from '../../../../shared/components/registerCard/register-card.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-car',
  standalone: true,
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent, RegisterCardComponent, BackButtonComponent]
})
export class CreateCarComponent {
  step = 1;
  clientes = ['Cliente 1', 'Cliente 2']; 
  cliente = '';
  plate = '';
  year: number | null = null;
  vin = '';
  renavam = '';
  insuranceClaimNumber = '';
  brand = '';
  model = '';
  color = '';
  notes = '';

  constructor(private router: Router) {}

  goBackStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  goBackList() {
    this.router.navigate(['/car-list']);
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

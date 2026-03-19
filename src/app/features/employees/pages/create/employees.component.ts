import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { RegisterCardComponent } from '../../../../shared/components/registerCard/register-card.component';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-create-employee',
	standalone: true,
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss'],
	imports: [CommonModule, FormsModule, BackButtonComponent, RegisterCardComponent, InputFieldComponent, SelectFieldComponent, RouterModule]
})

export class CreateEmployeeComponent {
	step = 1;
	// Etapa 1
	nome = '';
	cpf = '';
	telefone = '';
	// Etapa 2
	addressZip = '';
	addressStreet = '';
	addressNumber = '';
	addressDistrict = '';
	addressCity = '';
	addressState = '';
	// Etapa 3
	email = '';
	senha = '';
	cargo = '';
	loja = '';
	cargos = ['Admin', 'Comum'];
	lojas = ['Loja teste 1', 'Loja teste 2'];

	constructor(private router: Router) {}

	goBackStep() {
		if (this.step > 1) {
			this.step--;
		}
	}

	goBackList() {
		this.router.navigate(['/employees-list']);
	}

	nextStep() {
		if (this.step < 3) {
			this.step++;
		}
	}

	submit() {
		// lógica de envio do formulário
	}
}




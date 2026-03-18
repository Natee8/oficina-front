import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { RegisterCardComponent } from '../../../../shared/components/registerCard/register-card.component';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-create-employee',
	standalone: true,
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss'],
	imports: [CommonModule, BackButtonComponent, RegisterCardComponent, InputFieldComponent, SelectFieldComponent]
})

export class CreateEmployeeComponent {
	step = 1;
	// Etapa 1
	nome = '';
	cpf = '';
	email = '';
	senha = '';
	// Etapa 2
	telefone = '';
	cargo = '';
	loja = '';
	cargos = ['Admin', 'Comum'];
	lojas = ['Loja teste 1', 'Loja teste 2'];

	constructor(private router: Router) {}

	goBack() {
		if (this.step === 1) {
			this.router.navigate(['/employees-list']);
		} else {
			this.step = 1;
		}
	}

	nextStep() {
		this.step = 2;
	}

	submit() {
		// lógica de envio final
	}
}



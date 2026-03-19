import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { RegisterCardComponent } from '../../../../shared/components/registerCard/register-card.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';

@Component({
	selector: 'app-create-client',
	standalone: true,
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss'],
	imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent, RegisterCardComponent, BackButtonComponent]
})
export class CreateClientComponent {
	step = 1;
	nome = '';
	cpfCnpj = '';
	email = '';
	phone = '';
	addressZip = '';
	addressStreet = '';
	addressNumber = '';
	addressDistrict = '';
	addressCity = '';
	addressState = '';
	notes = '';
	loja = '';
	tipoLegal = '';
	lojas = ['Loja 1', 'Loja 2'];
	tiposLegais = ['Físico', 'Jurídico'];

	goBack() {
		if (this.step > 1) {
			this.step--;
		} else {
			// lógica para voltar para a listagem, se necessário
		}
	}
	nextStep() {
		if (this.step < 3) {
			this.step++;
		}
	}
	submit() {
		// lógica de envio final
	}
}

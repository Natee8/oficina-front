import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../shared/components/inputs/field/selectField.component';
import { RegisterCardComponent } from '../../../../shared/components/registerCard/register-card.component';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';

@Component({
	selector: 'app-oSs-create',
	standalone: true,
	templateUrl: './oSs.component.html',
	styleUrls: ['./oSs.component.scss'],
	imports: [
		CommonModule,
		FormsModule,
		InputFieldComponent,
		SelectFieldComponent,
		RegisterCardComponent,
		BackButtonComponent
	]
})
export class OSsCreateComponent {
	lojas: string[] = ['Loja 1', 'Loja 2', 'Loja 3'];
	clientes: string[] = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
	veiculos: string[] = ['Veículo 1', 'Veículo 2', 'Veículo 3'];

	loja: string = '';
	cliente: string = '';
	veiculo: string = '';
	dataEntrada: string = '';
	dataSaida: string = '';
	pintura: string = '';
	funilaria: string = '';
	valorPintura: string = '';
	valorFunilaria: string = '';

	avancar() {
		console.log('Dados do formulário:', {
			loja: this.loja,
			cliente: this.cliente,
			veiculo: this.veiculo,
			dataEntrada: this.dataEntrada,
			dataSaida: this.dataSaida,
			pintura: this.pintura,
			funilaria: this.funilaria,
			valorPintura: this.valorPintura,
			valorFunilaria: this.valorFunilaria,
		});
	}

	goBackList() {
		// Lógica para voltar para a lista de OSs
	}
}

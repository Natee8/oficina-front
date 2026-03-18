import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/backButton/back-button.component';
import { RegisterCardComponent } from '../../../../shared/components/registerCard/register-card.component';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';

@Component({
	selector: 'app-create-employee',
	standalone: true,
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss'],
	imports: [BackButtonComponent, RegisterCardComponent, InputFieldComponent]
})
export class CreateEmployeeComponent {
	constructor(private router: Router) {}

	goBack() {
		this.router.navigate(['/employees-list']);
	}
}

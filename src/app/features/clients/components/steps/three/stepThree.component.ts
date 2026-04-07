import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/select/selectField.component';
import { ClientData } from '../../../model/dtos/client.data';

@Component({
  selector: 'app-step-three-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent],
  templateUrl: './stepThree.component.html',
})
export class StepThreeClientComponent {
  @Input() data!: ClientData;
  @Input() errors: Record<string, string> = {};

  @Input() lojas: { label: string; value: number }[] = [];
  @Input() tiposLegais: { label: string; value: number }[] = [
    { label: 'Cliente Físico', value: 1 },
    { label: 'Cliente Empresa', value: 2 },
  ];
}

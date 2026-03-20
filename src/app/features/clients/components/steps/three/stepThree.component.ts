import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/field/selectField.component';

@Component({
  selector: 'app-step-three-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent],
  templateUrl: './stepThree.component.html',
})
export class StepThreeClientComponent {
  @Input() loja!: string;
  @Output() lojaChange = new EventEmitter<string>();

  @Input() tipoLegal!: string;
  @Output() tipoLegalChange = new EventEmitter<string>();

  @Input() notes!: string;
  @Output() notesChange = new EventEmitter<string>();

  @Input() lojas: string[] = [];
  @Input() tiposLegais: string[] = [];
}

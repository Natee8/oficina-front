import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepThree.component.html',
})
export class StepThreeComponent {
  @Input() cargo!: string;
  @Output() cargoChange = new EventEmitter<string>();

  @Input() loja!: string;
  @Output() lojaChange = new EventEmitter<string>();

  @Input() email!: string;
  @Output() emailChange = new EventEmitter<string>();

  @Input() senha!: string;
  @Output() senhaChange = new EventEmitter<string>();

  @Input() cargos!: string[];
  @Input() lojas!: string[];
}

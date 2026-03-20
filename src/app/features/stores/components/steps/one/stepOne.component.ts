import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-one-stores',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepOne.component.html',
})
export class StepOneStoresComponent {
  @Input() name!: string;
  @Output() nameChange = new EventEmitter<string>();

  @Input() cnpj!: string;
  @Output() cnpjChange = new EventEmitter<string>();
}

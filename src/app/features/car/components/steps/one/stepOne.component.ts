import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/field/selectField.component';

@Component({
  selector: 'app-step-one-car',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent],
  templateUrl: './stepOne.component.html',
})
export class StepOneCarComponent {
  @Input() cliente!: string;
  @Output() clienteChange = new EventEmitter<string>();

  @Input() plate!: string;
  @Output() plateChange = new EventEmitter<string>();

  @Input() year!: number | null;
  @Output() yearChange = new EventEmitter<number | null>();

  @Input() vin!: string;
  @Output() vinChange = new EventEmitter<string>();

  @Input() renavam!: string;
  @Output() renavamChange = new EventEmitter<string>();

  @Input() insuranceClaimNumber!: string;
  @Output() insuranceClaimNumberChange = new EventEmitter<string>();

  @Input() clientes: string[] = [];
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/select/selectField.component';

@Component({
  selector: 'app-step-one-car',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent],
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
})
export class StepOneCarComponent {
  @Input() cliente!: number | null;
  @Output() clienteChange = new EventEmitter<number | null>();

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

  @Input() clientes: Array<{ label: string; value: number }> = [];
}

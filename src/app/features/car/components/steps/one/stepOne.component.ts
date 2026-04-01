import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { SelectFieldComponent } from '../../../../../shared/components/inputs/select/selectField.component';
import { CarData } from '../../../model/dtos/vehicle.data';

@Component({
  selector: 'app-step-one-car',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SelectFieldComponent],
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
})
export class StepOneCarComponent {
  @Input() data!: CarData;
  @Output() dataChange = new EventEmitter<CarData>();

  @Input() errors: Record<string, string> = {};
  @Input() clientes: Array<{ label: string; value: number }> = [];
}

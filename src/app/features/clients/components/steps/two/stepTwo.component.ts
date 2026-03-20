import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepTwo.component.html',
})
export class StepTwoClientComponent {
  @Input() addressZip!: string;
  @Output() addressZipChange = new EventEmitter<string>();

  @Input() addressNumber!: string;
  @Output() addressNumberChange = new EventEmitter<string>();

  @Input() addressStreet!: string;
  @Output() addressStreetChange = new EventEmitter<string>();

  @Input() addressDistrict!: string;
  @Output() addressDistrictChange = new EventEmitter<string>();

  @Input() addressCity!: string;
  @Output() addressCityChange = new EventEmitter<string>();

  @Input() addressState!: string;
  @Output() addressStateChange = new EventEmitter<string>();
}

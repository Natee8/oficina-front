import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two-stores',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
})
export class StepTwoStoresComponent {
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

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
  @Input() data!: any;
@Input() errors!: Record<string, string>;
}

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { CommonModule } from '@angular/common';
import { ClientData } from '../../../model/dtos/client.data';

@Component({
  selector: 'app-step-two-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepTwo.component.html',
})
export class StepTwoClientComponent {
  @Input() data!: ClientData;
  @Input() errors: Record<string, string> = {};
}

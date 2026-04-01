import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OsData } from '../../../../osS/model/dtos/os.data';
import { ClientData } from '../../../model/dtos/client.data';

@Component({
  selector: 'app-step-one-client',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepOne.component.html',
})
export class StepOneClientComponent {
  @Input() data!: ClientData;
  @Input() errors: Record<string, string> = {};
}

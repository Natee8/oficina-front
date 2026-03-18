import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { CnpjMaskDirective } from '../../../../../../shared/utils/masks/CnpjMask';
import { StepOneData } from '../../../model/dto/IFormData.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'form-stepone',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [FormsModule, InputFieldComponent],
})
export class FormStepOne {
  @Input() data!: StepOneData;
  @Input() cnpjMask = false;
  @Input() ngModel: any;
  @Output() ngModelChange = new EventEmitter<any>();
}

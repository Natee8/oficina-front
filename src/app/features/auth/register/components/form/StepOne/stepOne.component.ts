import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { CnpjMaskDirective } from '../../../../../../shared/utils/masks/CnpjMask';

@Component({
  selector: 'form-stepone',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [InputFieldComponent, CnpjMaskDirective],
})
export class FormStepOne {}

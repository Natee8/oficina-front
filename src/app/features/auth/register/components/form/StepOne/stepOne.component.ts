import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';

@Component({
  selector: 'form-stepone',
  standalone: true,
  templateUrl: './stepOne.component.html',
  styleUrls: ['./stepOne.component.scss'],
  imports: [InputFieldComponent],
})
export class FormStepOne {}

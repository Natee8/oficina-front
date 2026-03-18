import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { StepTwoData } from '../../../model/dto/IFormData.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'form-steptwo',
  standalone: true,
  templateUrl: './stepTwo.component.html',
  styleUrls: ['./stepTwo.component.scss'],
  imports: [FormsModule, InputFieldComponent],
})
export class FormStepTwo {
  @Input() data!: StepTwoData;
}

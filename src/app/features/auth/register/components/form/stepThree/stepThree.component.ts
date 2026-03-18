import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldComponent } from '../../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { StepThreeData } from '../../../model/dto/IFormData.dto';

@Component({
  selector: 'form-stepthree',
  standalone: true,
  templateUrl: './stepThree.component.html',
  styleUrls: ['./stepThree.component.scss'],
  imports: [FormsModule, InputFieldComponent],
})
export class FormStepThree {
  @Input() data!: StepThreeData;
  @Input() cnpjMask = false;
  @Input() ngModel: any;
  @Output() ngModelChange = new EventEmitter<any>();
}

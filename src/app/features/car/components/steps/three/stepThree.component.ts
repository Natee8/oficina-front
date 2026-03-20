import { Component, EventEmitter, Output, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  templateUrl: './stepThree.component.html',
  imports: [InputFieldComponent, FormsModule],
})
export class StepThreeComponent {
  @Input() email!: string;
  @Input() senha!: string;

  @Output() back = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();
}

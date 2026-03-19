import { Component, EventEmitter, Output, Input } from '@angular/core';
import { InputFieldComponent } from "../../../../../shared/components/inputs/field/inputField.component";

@Component({
  selector: 'app-step-three',
  templateUrl: './stepThree.component.html',
  imports: [InputFieldComponent],
})
export class StepThreeComponent {
  @Input() email!: string;
  @Input() senha!: string;

  @Output() back = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();
}

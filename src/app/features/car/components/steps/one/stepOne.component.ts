import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './stepOne.component.html',
  imports: [FormsModule],
})
export class StepOneComponent {
  @Input() name!: string;
  @Input() cnpj!: string;
  @Output() next = new EventEmitter<void>();
}

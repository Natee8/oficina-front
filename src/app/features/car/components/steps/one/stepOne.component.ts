import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './stepOne.component.html',
})
export class StepOneComponent {
  @Input() name!: string;
  @Input() cnpj!: string;
  @Output() next = new EventEmitter<void>();
}

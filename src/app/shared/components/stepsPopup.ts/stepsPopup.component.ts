import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepsPopup.component.html',
  styleUrls: ['./stepsPopup.component.scss'],
})
export class StepperComponent {
  @Input() steps: {
    icon: string;
    title: string;
    subtitle: string;
  }[] = [];

  @Input() currentStep: number = 0;

  @Output() stepChange = new EventEmitter<number>();

  goToStep(index: number) {
    this.stepChange.emit(index);
  }
}

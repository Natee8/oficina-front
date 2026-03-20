import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldComponent } from '../../../../../shared/components/inputs/field/inputField.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two-car',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent],
  templateUrl: './stepTwo.component.html',
})
export class StepTwoCarComponent {
  @Input() brand!: string;
  @Output() brandChange = new EventEmitter<string>();

  @Input() model!: string;
  @Output() modelChange = new EventEmitter<string>();

  @Input() color!: string;
  @Output() colorChange = new EventEmitter<string>();

  @Input() notes!: string;
  @Output() notesChange = new EventEmitter<string>();
}

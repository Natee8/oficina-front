import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button-circle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="back-button" (click)="onClick()">
      <div class="circle">
        <i class="fa fa-arrow-left"></i>
      </div>
      <p><ng-content></ng-content></p>
    </div>
  `,
  styleUrls: ['./buttonBack.component.scss'],
})
export class BackButtonCircleComponent {
  @Output() clickBack = new EventEmitter<void>();

  onClick() {
    this.clickBack.emit();
  }
}

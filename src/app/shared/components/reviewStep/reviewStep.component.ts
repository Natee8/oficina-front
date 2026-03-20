import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviewStep.component.html',
  styleUrls: ['./reviewStep.component.scss'],
})
export class ReviewStepComponent {
  @Input() sections: {
    title: string;
    fields: {
      label: string;
      value: any;
    }[];
  }[] = [];
}

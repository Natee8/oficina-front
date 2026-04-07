import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buttonFilter.component.html',
  styleUrls: ['./buttonFilter.component.scss'],
})
export class ActionButtonComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() variant: 'default' | 'primary' = 'default';
  @Input() route?: string;

  @Output() clickAction = new EventEmitter<void>();
}

import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [NgStyle],
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();

  @Input() minWidth: string = '400px';
  @Input() minHeight: string = '200px';

  fechar() {
    this.close.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../../shared/components/popup/popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-upgrade',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './popupUpgrade.component.html',
  styleUrls: ['./popupUpgrade.component.scss']
})
export class PopupUpgradeComponent {
  @Input() currentPlan: string = '';
  @Output() closeModalEvent = new EventEmitter<boolean>();

  close(updated = false) {
    this.closeModalEvent.emit(updated);
  }
}
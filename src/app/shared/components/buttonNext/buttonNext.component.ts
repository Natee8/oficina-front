import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-actions',
  standalone: true,
  templateUrl: './buttonNext.component.html',
  styleUrls: ['./buttonNext.component.scss'],
})
export class ToggleActionsComponent {
  @Input() backLabel: string = 'Voltar';
  @Input() nextLabel: string = 'Avançar';

  @Input() disableNext: boolean = false;

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  activeNext = true;

  goBack() {
    this.activeNext = false;
    this.back.emit();
  }

  goNext() {
    if (this.disableNext) return;
    this.activeNext = true;
    this.next.emit();
  }
}

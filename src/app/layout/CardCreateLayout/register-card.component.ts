import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-register-card',
  standalone: true,
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss'],
  imports: [CommonModule],
})
export class RegisterCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() stepInfo?: string;

  stpsatual = 1;
  steptotal = 2;

  nextStep() {
    if (this.stpsatual < this.steptotal) {
      this.stpsatual++;
    } else {
      this.finish();
    }
  }

  previousStep() {
    if (this.stpsatual > 1) {
      this.stpsatual--;
    }
  }

  finish() {
    console.log('Finalizado!');
  }
}

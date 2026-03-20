import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { RouterLink } from '@angular/router';
import { BackButtonCircleComponent } from "../../../../shared/components/buttonBack/buttonBack.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [InputFieldComponent, RouterLink, BackButtonCircleComponent],
})
export class LoginComponent {
  step = 1;
  handleBack() {
    console.log('Botão de voltar clicado');
  }
  handleNext() {
    console.log('oi');
  }
}

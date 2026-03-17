import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/buttonBack/buttonBack.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [InputFieldComponent, RouterLink, BackButtonComponent],
})
export class LoginComponent {
  handleBack() {
    // Pode navegar para outra página, fechar modal, etc.
    console.log('Botão de voltar clicado');
  }
}

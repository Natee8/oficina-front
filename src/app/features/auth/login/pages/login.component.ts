import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginData } from '../model/auth.dto';
import { TokenService } from '../../../../core/services/token.service';
import { login } from '../services/loginService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [InputFieldComponent, RouterLink, FormsModule],
})
export class LoginComponent {
  step = 1;
  email = '';
  password = '';

  constructor(private snackBar: MatSnackBar) {}

  handleBack() {
    console.log('Botão de voltar clicado');
  }

  async handleLogin(event: Event) {
    event.preventDefault();

    const data: LoginData = {
      email: this.email,
      password: this.password,
    };

    try {
      const result = await login(data);

      TokenService.saveToken(result.token);

      this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      console.log('Usuário logado:', result.user);
    } catch (err: any) {
      this.snackBar.open(err.message || 'Erro ao fazer login', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../../core/services/token.service';
import { InputFieldComponent } from '../../../../shared/components/inputs/field/inputField.component';
import { LoginData } from '../model/auth.dto';
import { login } from '../services/loginService';
import { loginSchema } from '../schemas/login.schema';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [InputFieldComponent, RouterLink, FormsModule, MatSnackBarModule, NgIf],
})
export class LoginComponent {
  step = 1;
  email = '';
  password = '';

  errors: { [key: string]: string } = {};

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  handleBack() {
    console.log('Botão de voltar clicado');
  }

  async handleLogin(event: Event) {
    event.preventDefault();

    const data: LoginData = { email: this.email, password: this.password };

    try {
      await loginSchema.validate(data, { abortEarly: false });

      this.errors = {};

      const result = await login(data);

      TokenService.saveToken(result.token);
      await this.router.navigate(['/os-list']);

      this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      console.log('Usuário logado:', result.user);
    } catch (err: any) {
      if (err.inner) {
        const fieldErrors: any = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        this.errors = fieldErrors;
      } else {
        this.snackBar.open(err?.error?.message || err?.message || 'Erro ao fazer login', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }
  }
}

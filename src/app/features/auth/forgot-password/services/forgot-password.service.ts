import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../../core/api/buildApiUrl';
import { ForgotPasswordRequest, VerifyResetCodeRequest, ResetPasswordRequest } from '../model/forgot-password.dto';

@Injectable({
	providedIn: 'root',
})
export class ForgotPasswordService {
	private readonly apiUrl = buildApiUrl('auth');

	constructor(private http: HttpClient) {}

	solicitarCodigo(data: ForgotPasswordRequest): Observable<any> {
		return this.http.post(`${this.apiUrl}/forgot-password`, data);
	}

	verificarCodigo(data: VerifyResetCodeRequest): Observable<any> {
		return this.http.post(`${this.apiUrl}/verify-reset-code`, data);
	}

	redefinirSenha(data: ResetPasswordRequest): Observable<any> {
		return this.http.post(`${this.apiUrl}/reset-password`, data);
	}
}

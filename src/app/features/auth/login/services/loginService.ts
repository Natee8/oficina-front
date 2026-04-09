import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../../core/api/buildApiUrl';
import { LoginData, LoginResponse } from '../model/auth.dto';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly apiUrl = buildApiUrl('auth/login');

  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, data);
  }
}

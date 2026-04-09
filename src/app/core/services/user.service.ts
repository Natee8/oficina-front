import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../features/auth/login/model/user.dto';
import { TokenService } from './token.service';
import { buildApiUrl } from '../api/buildApiUrl';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<User | Partial<User> | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  async loadUser(): Promise<User | null> {
    const token = TokenService.getToken();
    if (!token) return null;

    try {
      const user = await firstValueFrom(
        this.http.get<User>(buildApiUrl('users/me'), {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      this.userSubject.next(user);
      return user;
    } catch (err) {
      return null;
    }
  }

  setUser(user: User | Partial<User>) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }

  clearUser() {
    this.userSubject.next(null);
  }
}

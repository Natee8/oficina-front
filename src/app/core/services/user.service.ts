import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../features/auth/login/model/user.dto';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<User | Partial<User> | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUser() {
    const token = TokenService.getToken();
    if (!token) return;

    return this.http
      .get<User>('http://localhost:5233/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe((user) => this.userSubject.next(user));
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

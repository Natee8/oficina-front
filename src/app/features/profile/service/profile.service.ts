import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileDto } from '../model/profile.dto';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly apiUrl = 'http://localhost:5233/api/users/me';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileDto> {
    return this.http.get<ProfileDto>(this.apiUrl);
  }

  patchProfile(data: Partial<ProfileDto>): Observable<ProfileDto> {
    return this.http.patch<ProfileDto>(this.apiUrl, data);
  }
}

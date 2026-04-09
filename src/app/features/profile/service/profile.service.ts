import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileDto } from '../model/profile.dto';
import { buildApiUrl } from '../../../core/api/buildApiUrl';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly apiUrl = buildApiUrl('users/me');

  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileDto> {
    return this.http.get<ProfileDto>(this.apiUrl);
  }

  patchProfile(data: Partial<ProfileDto>): Observable<ProfileDto> {
    return this.http.patch<ProfileDto>(this.apiUrl, data);
  }
}

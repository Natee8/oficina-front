import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreDto } from '../model/store.dto';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../core/api/buildApiUrl';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private baseUrl = buildApiUrl('units');

  constructor(private http: HttpClient) {}

  getStores(): Observable<StoreDto[]> {
    return this.http.get<StoreDto[]>(this.baseUrl);
  }

  createStore(storeData: Partial<StoreDto>): Observable<StoreDto> {
    const token = TokenService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.post<StoreDto>(this.baseUrl, storeData, { headers });
  }

  updateStore(id: number, storeData: Partial<StoreDto>): Observable<StoreDto> {
    const token = TokenService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.patch<StoreDto>(`${this.baseUrl}/${id}`, storeData, { headers });
  }

  deleteStore(id: number): Observable<void> {
    const token = TokenService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}

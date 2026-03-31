import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreDto } from '../model/store.dto';
import { TokenService } from '../../../core/services/token.service';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private baseUrl = 'http://localhost:5233/api/units';

  constructor(private http: HttpClient) {}

  getStores(): Observable<StoreDto[]> {
    return this.http.get<StoreDto[]>(this.baseUrl);
  }

  createStore(storeData: Partial<StoreDto>): Observable<StoreDto> {
    const token = TokenService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.post<StoreDto>(this.baseUrl, storeData, { headers });
  }
}

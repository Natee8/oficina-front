import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreDto } from '../model/store.dto';
import { map, Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { inject, Injectable } from '@angular/core';
import { buildApiUrl } from '../../../core/api/buildApiUrl';
import { UnitAccessService } from '../../../core/services/unit-access.service';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private baseUrl = buildApiUrl('units');
  private http = inject(HttpClient);
  private unitAccessService = inject(UnitAccessService);

  getStores(): Observable<StoreDto[]> {
    return this.http
      .get<StoreDto[]>(this.baseUrl)
      .pipe(map((stores) => this.unitAccessService.filterAllowedUnits(stores)));
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreDto } from '../model/store.dto';

@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor(private http: HttpClient) {}

  getStores(): Observable<StoreDto[]> {
    return this.http.get<StoreDto[]>('http://localhost:5233/api/units');
  }
}

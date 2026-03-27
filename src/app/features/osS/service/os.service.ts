import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OsDto } from '../model/dtos/os.dto';

@Injectable({ providedIn: 'root' })
export class OsService {
  private readonly apiUrl = 'http://localhost:5233/api/ServiceOrders';

  constructor(private http: HttpClient) {}

  getServiceOrders(): Observable<OsDto[]> {
    return this.http.get<OsDto[]>(this.apiUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto } from '../model/dtos/client.dto';
import { CreateClientDto } from '../model/dtos/createClient.dto';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = 'http://localhost:5233/api/customers';
  private unitsUrl = 'http://localhost:5233/api/units';

  constructor(private http: HttpClient) {}

  getCustomers(filters?: { unitId?: number | null }): Observable<ClientDto[]> {
    let params: any = {};

    if (filters?.unitId) {
      params.unitId = filters.unitId;
    }

    return this.http.get<ClientDto[]>(this.baseUrl, { params });
  }

  createClient(payload: CreateClientDto): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  getLojas(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.unitsUrl);
  }

  updateClient(id: number, payload: CreateClientDto): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, payload);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

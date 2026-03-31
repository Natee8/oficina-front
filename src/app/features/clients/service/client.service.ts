import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto } from '../model/client.dto';
import { CreateClientDto } from '../model/createClient.dto';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = 'http://localhost:5233/api/customers';
  private unitsUrl = 'http://localhost:5233/api/units';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(this.baseUrl);
  }

  createClient(payload: CreateClientDto): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  getLojas(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.unitsUrl);
  }
}

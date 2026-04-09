import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto } from '../model/dtos/client.dto';
import { CreateClientDto } from '../model/dtos/createClient.dto';
import { buildApiUrl } from '../../../core/api/buildApiUrl';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = buildApiUrl('customers');
  private unitsUrl = buildApiUrl('units');
  private viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  getCustomers(filters?: { unitIds?: number[] }): Observable<ClientDto[]> {
    let params: any = {};
    if (filters?.unitIds?.length) {
      params.unitIds = filters.unitIds.join(',');
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

  getAddressByCep(cep: string): Observable<any> {
    const sanitizedCep = cep.replace(/\D/g, '');
    if (sanitizedCep.length !== 8) {
      throw new Error('CEP inválido');
    }
    return this.http.get(`${this.viaCepUrl}/${sanitizedCep}/json/`);
  }
}

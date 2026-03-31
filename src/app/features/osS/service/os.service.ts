import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OsDto } from '../model/dtos/os.dto';

export interface CreateOsPart {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOsPayload {
  unitId: number;
  vehicleId: number;
  ownerCustomerId: number;
  entryDate: string;
  estimatedDeliveryDate: string;
  bodyworkDescription: string;
  bodyworkValue: number;
  paintDescription: string;
  paintValue: number;
  parts: CreateOsPart[];
}

@Injectable({ providedIn: 'root' })
export class OsService {
  private readonly apiUrl = 'http://localhost:5233/api/ServiceOrders';

  constructor(private http: HttpClient) {}

  getServiceOrders(): Observable<OsDto[]> {
    return this.http.get<OsDto[]>(this.apiUrl);
  }

  postServiceOrder(payload: CreateOsPayload) {
    return this.http.post<OsDto>(this.apiUrl, payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OsDto } from '../model/dtos/os.dto';
import { StatusOs } from '../model/types/status';
import { CreateOsPayload } from '../model/dtos/osPayload';
import { UpdateOsPayload } from '../model/dtos/payloadUpdate.dto';

@Injectable({ providedIn: 'root' })
export class OsService {
  private readonly apiUrl = 'http://localhost:5233/api/ServiceOrders';

  constructor(private http: HttpClient) {}

  getServiceOrders(filters?: { unitId?: number[] }) {
    let params: any = {};

    if (filters?.unitId) {
      params.unitId = filters.unitId;
    }

    return this.http.get<OsDto[]>(this.apiUrl, { params });
  }

  postServiceOrder(payload: CreateOsPayload) {
    return this.http.post<OsDto>(this.apiUrl, payload);
  }

  patchServiceOrder(id: number, payload: UpdateOsPayload) {
    return this.http.patch<OsDto>(`${this.apiUrl}/${id}`, payload);
  }

  patchServiceOrderStatus(id: number, status: StatusOs) {
    return this.http.patch<OsDto>(`${this.apiUrl}/${id}/status/${status}`, {});
  }

  deleteServiceOrder(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getServiceOrderPdf(id: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}

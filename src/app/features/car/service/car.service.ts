import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleDto } from '../model/dtos/vehicle.dto';
import { CreateVehiclePayload } from '../model/dtos/vehiclePayload.dto';
import { buildApiUrl } from '../../../core/api/buildApiUrl';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly apiUrl = buildApiUrl('vehicles');

  constructor(private http: HttpClient) {}

  getVehicles(filters?: { unitId?: number | null }): Observable<VehicleDto[]> {
    let params: any = {};

    if (filters?.unitId) {
      params.unitId = filters.unitId;
    }

    return this.http.get<VehicleDto[]>(this.apiUrl, { params });
  }

  postVehicle(payload: CreateVehiclePayload): Observable<VehicleDto> {
    return this.http.post<VehicleDto>(this.apiUrl, payload);
  }

  patchVehicle(id: number, payload: CreateVehiclePayload): Observable<VehicleDto> {
    return this.http.patch<VehicleDto>(`${this.apiUrl}/${id}`, payload);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleDto } from '../model/vehicle.dto';

export interface CreateVehiclePayload {
  customerId: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  renavam: string;
  insuranceClaimNumber: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly apiUrl = 'http://localhost:5233/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<VehicleDto[]> {
    return this.http.get<VehicleDto[]>(this.apiUrl);
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

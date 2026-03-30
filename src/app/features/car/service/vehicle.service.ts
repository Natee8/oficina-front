import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleDto } from '../model/vehicle.dto';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<VehicleDto[]> {
    return this.http.get<VehicleDto[]>('http://localhost:5233/api/vehicles');
  }
}

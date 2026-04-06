import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateEmployeePayload,
  EmployeeListItem,
  Unit,
  UpdateEmployeePayload,
} from '../model/dtos/employerPayload';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:5233/api';

  constructor(private http: HttpClient) {}

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.apiUrl}/units`);
  }

  getEmployees(filters?: { unitId?: number | null; role?: string | null }): Observable<EmployeeListItem[]> {
    let params = new HttpParams();

    if (filters?.unitId != null) {
      params = params.set('unitId', filters.unitId.toString());
    }

    if (filters?.role) {
      params = params.set('role', filters.role);
    }

    return this.http.get<EmployeeListItem[]>(`${this.apiUrl}/users`, { params });
  }

  createEmployee(payload: CreateEmployeePayload) {
    return this.http.post(`${this.apiUrl}/users`, payload);
  }

  updateEmployee(id: number, payload: UpdateEmployeePayload) {
    return this.http.patch(`${this.apiUrl}/users/${id}`, payload);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}

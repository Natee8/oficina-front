import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CreateEmployeePayload,
  EmployeeListItem,
  Unit,
  UpdateEmployeePayload,
} from '../model/dtos/employerPayload';
import { buildApiUrl } from '../../../core/api/buildApiUrl';
import { StoreService } from '../../stores/service/store.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl = buildApiUrl();

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
  ) {}

  getUnits(): Observable<Unit[]> {
    return this.storeService
      .getStores()
      .pipe(map((stores) => stores.map(({ id, name }) => ({ id, name }))));
  }

  getEmployees(filters?: { unitId?: number[] | null; role?: string | null }) {
    let params = new HttpParams();

    if (filters?.unitId?.length) {
      filters.unitId.forEach((id) => {
        params = params.append('unitId', id.toString());
      });
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

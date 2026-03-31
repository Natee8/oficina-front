import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEmployeePayload, Unit } from '../model/dtos/employerPayload';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:5233/api';

  constructor(private http: HttpClient) {}

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.apiUrl}/units`);
  }

  createEmployee(payload: CreateEmployeePayload) {
    return this.http.post(`${this.apiUrl}/users`, payload);
  }
}

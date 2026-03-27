import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenantDto } from '../model/tenant.dto';

@Injectable({ providedIn: 'root' })
export class TenantService {
	private readonly apiUrl = 'http://localhost:5233/api/tenants';

	constructor(private http: HttpClient) {}

	getTenant(): Observable<TenantDto> {
		return this.http.get<TenantDto>(this.apiUrl);
	}

	updateTenant(data: Partial<TenantDto>): Observable<TenantDto> {
		return this.http.patch<TenantDto>(this.apiUrl, data);
	}
}

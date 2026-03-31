import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto } from '../model/client.dto';

@Injectable({ providedIn: 'root' })
export class ClientService {
	constructor(private http: HttpClient) {}

	getCustomers(): Observable<ClientDto[]> {
		return this.http.get<ClientDto[]>('http://localhost:5233/api/customers');
	}
}

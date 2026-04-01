import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NfImportResponseDto } from '../model/nfs.dto';

@Injectable({ providedIn: 'root' })
export class NfsService {
  private readonly apiUrl = 'http://localhost:5233/api/ServiceOrders';

  constructor(private http: HttpClient) {}

  uploadNfs(file: File): Observable<NfImportResponseDto> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<NfImportResponseDto>(`${this.apiUrl}/import/excel/resumo`, formData);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;


@Injectable({ providedIn: 'root' })
export class PayslipsService {

  // private apiUrl = 'http://localhost:8080/api/salary';

  http = inject(HttpClient);

  private getHeaders(contentType: string = ''): HttpHeaders {

  const token = localStorage.getItem('token') || '';

    const headersConfig: any = {
      Authorization: `Bearer ${token}`
    };

    if (contentType) {
      headersConfig['Content-Type'] = contentType;
    }

    return new HttpHeaders(headersConfig);
  }


  getSalaryByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/salary/email/${email}`, {
      headers: this.getHeaders()
    });
  }

  downloadById(id: number): Observable<Blob> {
    return this.http.get(`${NAV_URL}/salary/id/${id}`, {
      responseType: 'blob',
      headers: this.getHeaders()
    });
  }
}

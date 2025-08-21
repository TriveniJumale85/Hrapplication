import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


const NAV_URL = environment.apiUrl;


@Injectable({ providedIn: 'root' })
export class AttendanceService {

  // private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getHeaders(contentType: string = ''): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    const headersConfig: any = { Authorization: `Bearer ${token}` };

    if (contentType) {
      headersConfig['Content-Type'] = contentType;
    }

    return new HttpHeaders(headersConfig);
  }

  signIn(data: any): Observable<any> {
    return this.http.post(`${NAV_URL}/attendance/signIn`, data, {
      responseType: 'text',
      headers: this.getHeaders(''),
    });
  }

  signOut(employeeId: number): Observable<any> {
    return this.http.post(
      `${NAV_URL}/attendance/signOut`,
      { employeeId },
      {
        headers: this.getHeaders(''),
      }
    );
  }

  getStatus(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${NAV_URL}/attendance/getByEmployeeId/${employeeId}`,
      {
        headers: this.getHeaders(''),
      }
    );
  }

  getEmployeeCalendar(employeeId: number, year: number, month: number): Observable<any> {
    const url = `${NAV_URL}/calendar-days/employee/${employeeId}/calendar?year=${year}&month=${month}`;
    return this.http.get(url);
  }

}










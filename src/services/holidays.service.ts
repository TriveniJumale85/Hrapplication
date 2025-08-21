import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


const NAV_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private apiUrl = 'http://localhost:8080/api/holidays';

  constructor(private http: HttpClient) {}

  // Get JWT headers
  private getHeaders(contentType: string = ''): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    const headersConfig: any = { Authorization: `Bearer ${token}` };

    if (contentType) {
      headersConfig['Content-Type'] = contentType;
    }

    return new HttpHeaders(headersConfig);
  }

  // Create a new holiday
  createHoliday(holiday: any): Observable<any> {
    return this.http.post<any>(`${NAV_URL}/holidays`, holiday, {
      headers: this.getHeaders()
    });
  }

  // Get all holidays
  getHolidays(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/holidays`, {
      headers: this.getHeaders()
    });
  }

 deleteHoliday(id: number): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(`${NAV_URL}/holidays/id/${id}`, { headers });
}

}

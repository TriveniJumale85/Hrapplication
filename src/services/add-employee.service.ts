
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {

  // http://localhost:8080/api
  // private apiUrl = 'http://localhost:8080/api/employees';
  // private apiUrl2 = 'http://localhost:8080/api/Employee/register';

  constructor(private http: HttpClient) {}

  // ✅ Get JWT headers
  private getHeaders(contentType: string = ''): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    const headersConfig: any = { Authorization: `Bearer ${token}` };

    if (contentType) {
      headersConfig['Content-Type'] = contentType;
    }

    return new HttpHeaders(headersConfig);
  }


  //! ✅ Get all employees
 getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/employees`, { headers: this.getHeaders() });
  }

  //! ✅ Add new employee
  addEmployeeWithImage(formData: FormData): Observable<any> {
    return this.http.post(`${NAV_URL}/employees`, formData, {
      headers: this.getHeaders(''), // 👈 No Content-Type
    });
  }

  //! ✅ Update employee
  updateEmployeeWithImage(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${NAV_URL}/employees/${id}`, formData, {
      headers: this.getHeaders(''), // 👈 No Content-Type
    });
  }

  // ✅ Delete employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/employees/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Register employee
  registerEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${NAV_URL}/Employee/register`, employee, {
      headers: this.getHeaders(),
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/regularization-and-permission';

export type RequestType = 'REGULARIZATION' | 'PERMISSION';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RequestPayload {
  requestType: RequestType;
  reason: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  email: string; // ✅ Ensure email is part of payload
}

export interface RegularizationResponse {
  message?: string;
  status: ApprovalStatus;
  reason: string;
}

export interface RegularizationAndPermission {
status: any;
fromDate: any;
email: any;
  id: number;
  requestType: RequestType;
  approvalStatus: ApprovalStatus;
  reason: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  employee: {
    id: number;
    name: string;
    email?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class RegularizationService {
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

  getAllRequests(): Observable<RegularizationAndPermission[]> {
    return this.http.get<RegularizationAndPermission[]>(`${API_URL}`,
      { headers: this.getHeaders() }
    );
  }

  getAllPendingRequests(): Observable<RegularizationAndPermission[]> {
    return this.http.get<RegularizationAndPermission[]>(`${API_URL}/pending-requests`,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Updated: Send email as query param
  requestRegularization(empId: number, data: RequestPayload): Observable<RegularizationResponse> {
    const params = new HttpParams().set('email', data.email);
    return this.http.post<RegularizationResponse>(`${API_URL}/request-regularization/${empId}`,data,
    { headers: this.getHeaders('application/json'), params }
    );
  }

  // ✅ Updated: Send email as query param
  requestPermission(empId: number, data: RequestPayload): Observable<RegularizationResponse> {
    const params = new HttpParams().set('email', data.email);
    return this.http.post<RegularizationResponse>(`${API_URL}/request-permission/${empId}`,data,
      { headers: this.getHeaders('application/json'), params }
    );
  }
//
  // approveRequest(id: number): Observable<RegularizationAndPermission> {
  //   return this.http.put<RegularizationAndPermission>(`${API_URL}/approve/${id}`, {
  //     headers: this.getHeaders(),
  //   });
  // }

  // rejectRequest(id: number): Observable<RegularizationAndPermission> {
  //   return this.http.put<RegularizationAndPermission>(`${API_URL}/reject/${id}`, {
  //     headers: this.getHeaders(),
  //   });
  // }




  approveRequest(id: number): Observable<RegularizationAndPermission> {
  return this.http.put<RegularizationAndPermission>(
    `${API_URL}/approve/${id}`,
    {}, // ✅ empty body
    { headers: this.getHeaders() } // ✅ correct headers
  );
}

rejectRequest(id: number): Observable<RegularizationAndPermission> {
  return this.http.put<RegularizationAndPermission>(
    `${API_URL}/reject/${id}`,
    {}, // ✅ empty body
    { headers: this.getHeaders() }
  );
}


  deleteRequest(id: number): Observable<string> {
    return this.http.delete(`${API_URL}/delete/${id}`, { responseType: 'text', headers: this.getHeaders() });
  }

  getPermissionsByEmployeeId(empId: number): Observable<RegularizationAndPermission[]> {
    return this.http.get<RegularizationAndPermission[]>(`${API_URL}/permissions/${empId}`,
       { headers: this.getHeaders() });
  }

  getRegularizationsByEmployeeId(empId: number): Observable<RegularizationAndPermission[]> {
    return this.http.get<RegularizationAndPermission[]>(`${API_URL}/regularizations/${empId}`,
      { headers: this.getHeaders() });
  }

  getAllRequestByEmployeeId(empId: number): Observable<RegularizationAndPermission[]> {
    return this.http.get<RegularizationAndPermission[]>(`${API_URL}/request/${empId}`,
      { headers: this.getHeaders() });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

export type LeaveType = 'SICK' | 'CASUAL' | 'PAID' | 'UNPAID';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface LeaveRequest {
  leaveId?: number;
  employeeId: number;
  employeeName?: string; // ✅ Add this
  fromDate: string;
  toDate: string;
  reason: string;
  applyingTo: string;
  ccTo: string[];
  contactDetails: string;
  leaveType: LeaveType;
  status?: LeaveStatus;
}


@Injectable({
  providedIn: 'root'
})
export class ApplyLeavesService {

  [x: string]: any;

  // private apiUrl = 'http://localhost:8080/api/leaves';

  constructor(private http: HttpClient) {}


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


 applyLeave(formData: FormData): Observable<any> {
    return this.http.post(`${NAV_URL}/leaves/createLeave`, formData, {
      headers: this.getAuthHeaders()
    });
  }


  getAllLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${NAV_URL}/leaves/getAllLeaves`, {
      headers: this.getAuthHeaders()
    });
  }

  getLeaveById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${NAV_URL}/leaves/getLeaveById/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  updateLeaveStatus(id: number, status: LeaveStatus): Observable<any> {
    return this.http.put(`${NAV_URL}/leaves/updateStatusById/${id}/status?status=${status}`, null, {
      headers: this.getAuthHeaders()
    });
  }


  deleteLeave(id: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/leaves/DeleteLeaveById/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  getLeavesByEmployeeId(empId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${NAV_URL}/leaves/employee/${empId}`, {
      headers: this.getAuthHeaders()
    });
  }


  getMyLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${NAV_URL}/leaves/myLeaves`, {
      headers: this.getAuthHeaders()
    });
  }
   getLeaveStatusByEmployeeId(employeeId: number): Observable<any> {
    return this.http.get(`${NAV_URL}/leaves/leaveStatuses/${employeeId}`);
  }


 getCcToEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/leaves/ccToEmployees`, {
      headers: this.getAuthHeaders()
    });
  }

  getLeaveStatusDetailsByEmployeeId(employeeId: number): Observable<any> {
  return this.getAllLeaves().pipe(
    map((leaves: any[]) => {
      const userLeaves = leaves
        .filter((l) => l.employeeId === employeeId)
        .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime());

      let latestStatus = '';
      let latestDate = '';
      let sickLeave = 0;
      let casualLeave = 0;
      let sampleLeave = 0;
      let paidLeave = 0;
      let unpaidLeave = 0;
      let maternityLeave = 0;

      if (userLeaves.length > 0) {
        latestStatus = userLeaves[0].status;
        latestDate = userLeaves[0].fromDate;
      }

      const approvedLeaves = userLeaves.filter((l) => l.status === 'APPROVED');
      sickLeave = approvedLeaves.filter((l) => l.leaveType === 'SICK').length;
      casualLeave = approvedLeaves.filter((l) => l.leaveType === 'CASUAL').length;
      sampleLeave = approvedLeaves.filter((l) => l.leaveType === 'SAMPLE').length;
      paidLeave = approvedLeaves.filter((l) => l.leaveType === 'PAID').length;
      unpaidLeave = approvedLeaves.filter((l) => l.leaveType === 'UNPAID').length;
      maternityLeave = approvedLeaves.filter((l) => l.leaveType === 'MATERNITY').length;

      const totalApproved = sickLeave + casualLeave + sampleLeave;

      return {
        latestStatus,
        latestDate,
        sickLeave,
        casualLeave,
        sampleLeave,
        paidLeave,
        unpaidLeave,
        maternityLeave,
        totalApproved
      };
    })
  );
}







}

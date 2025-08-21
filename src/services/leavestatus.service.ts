import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

export interface Leave {
  id: number;
  employeeId: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
  remark?: string;   
}

export interface LeaveBalance {
  annual: number;
  casual: number;
  sick: number;
}

@Injectable({ providedIn: 'root' })
export class LeavestatusService {
  constructor(private http: HttpClient) {}

  // -------------------------
  // 📌 Leave APIs
  // -------------------------

  /** Get Leave Balance by Employee ID */
  getLeaveBalance(employeeId: number): Observable<LeaveBalance> {
    return this.http.get<LeaveBalance>(`${NAV_URL}/leaves/leaveBalance/${employeeId}`);
  }

  /** Get All Leaves */
  getAllLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${NAV_URL}/leaves/getAllLeaves`);
  }

  /** Create Leave Request */
  createLeave(formData: FormData): Observable<any> {
    return this.http.post<any>(`${NAV_URL}/leaves/createLeave`, formData);
  }

  /** Delete Leave by ID */
  deleteLeave(id: number): Observable<string> {
    return this.http.delete(`${NAV_URL}/leaves/DeleteLeaveById/${id}`, {
      responseType: 'text',
    });
  }
/** ✅ Update Leave Status */
updateLeaveStatus(id: number, status: string): Observable<any> {
  return this.http.put(
    `${NAV_URL}/leaves/updateStatus/${id}?status=${encodeURIComponent(status)}`,
    {}  
  );
}


  /** Withdraw (Cancel) Leave Request */
  cancelLeaveById(leaveId: number): Observable<any> {
    return this.http.put(`${NAV_URL}/leaves/CancelLeaveById/${leaveId}`, {});
  }

  /** Get Applying To Email List */
  getApplyingToEmail(): Observable<string[]> {
    return this.http.get<string[]>(`${NAV_URL}/leaves/applyingTo`);
  }

  /** Get CC To Email List */
  getCcToEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${NAV_URL}/leaves/ccToEmployees`);
  }

  // -------------------------

  /** Add remark to a leave */
  addRemark(leaveId: number, remark: string): Observable<any> {
    return this.http.post(
      `${NAV_URL}/leaves/addRemark/${leaveId}?remark=${encodeURIComponent(remark)}`,
      {}
    );
  }

  /** Get remark for a specific leave */
  getRemarksByLeave(leaveId: number): Observable<string> {
    return this.http.get(`${NAV_URL}/leaves/getRemark/${leaveId}`, {
      responseType: 'text',
    });
  }
}

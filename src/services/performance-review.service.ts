import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

export interface Employee {
  id: number;
  name: string;
}

export interface Task {
  employee: any;
  description: any;
  id: number;
  taskName: string;
}

export interface PerformanceReview {
  reviewId?: number;
  taskName: string;
  managerReview: string;
  reviewDate: string;
  employee: { id: number };
  task: { id: number };
  description?: string; // ❓ optional if not used in backend
   employeeId?: number;
  taskId?: number;
}


const NAV_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getHeaders(contentType = 'application/json'): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    const headersConfig: any = {
      Authorization: `Bearer ${token}`
    };
    if (contentType) {
      headersConfig['Content-Type'] = contentType;
    }
    return new HttpHeaders(headersConfig);
  }

  // ➤ Create a performance review
  createReview(review: PerformanceReview): Observable<any> {
    return this.http.post(`${NAV_URL}/reviews/createReview`, review, {
      headers: this.getHeaders()
    });
  }

  // ➤ Get all performance reviews
  getAllReviews(): Observable<PerformanceReview[]> {
    return this.http.get<PerformanceReview[]>(`${NAV_URL}/reviews/getAllReviews`, {
      headers: this.getHeaders()
    });
  }

  // ➤ Update a performance review
  updateReview(id: number, review: PerformanceReview): Observable<any> {
    return this.http.put(`${NAV_URL}/reviews/updateReview/${id}`, review, {
      headers: this.getHeaders()
    });
  }

  // ➤ Delete a review
  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/reviews/DeleteById/${id}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }

  // ➤ Get all employees (for manager dropdown)
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${NAV_URL}/employee/getAll`, {
      headers: this.getHeaders()
    });
  }

  // ➤ Get all tasks assigned to manager or employees
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${NAV_URL}/task/getAll`, {
      headers: this.getHeaders()
    });
  }

  // ➤ Optional: Get tasks by employeeId
  getTasksByEmployeeId(empId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${NAV_URL}/tasks/employee/${empId}`, {
      headers: this.getHeaders()
    });
  }
}

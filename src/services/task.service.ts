import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { BehaviorSubject } from 'rxjs';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
    });
  }

  private getJsonHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
      'Content-Type': 'application/json',
    });
  }

  private tasksSubject = new BehaviorSubject<any[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  // 👇 Add this method to set tasks globally
  setTasks(tasks: any[]): void {
    this.tasksSubject.next(tasks);
  }

  // ✅ Create Task with optional file and employeeId
  createTask(
    task: any,
    attachment?: File,
    employeeId?: number
  ): Observable<any> {
    const formData = new FormData();
    formData.append('task', JSON.stringify(task));
    if (attachment) {
      formData.append('attachment', attachment);
    }
    formData.append('employeeId', employeeId?.toString() || '');

    return this.http.post(`${NAV_URL}/tasks`, formData, {
      headers: this.getHeaders(),
    });
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${NAV_URL}/tasks/${id}`, task, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Get all tasks (for manager)
  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/tasks`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Get tasks for a specific employee
  getTasksByEmployeeId(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/tasks/employee/${employeeId}`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Get single task by ID
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${NAV_URL}/tasks/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // ✅ Update Task Status By Task ID
  updateTaskStatus(taskId: number, status: string): Observable<any> {
    return this.http.put(
      `${NAV_URL}/tasks/${taskId}/status?status=${status}`,
      {},
      {
        headers: this.getJsonHeaders(),
        responseType: 'text' as 'json',
      }
    );
  }

  // ✅ Delete a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/tasks/${id}`, {
      headers: this.getHeaders(),
    });
  }
}

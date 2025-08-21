import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


const NAV_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root',
})

export class UserService {

  // private apiUrl = 'http://localhost:8080/api/Employee';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // Content-Type mat do, kyunki query param ja rahe hain, koi body nahi
    });
  }

  updatePassword(userId: number, newPassword: string): Observable<any> {
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('newPassword', newPassword);
    return this.http.put(`${NAV_URL}/Employee/update-password`, null, {
      headers,
      params,
      responseType: 'text',
    });
  }

  updateProfilePicture(userId: number, profilePicture: File): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('profilePicture', profilePicture);
    return this.http.put(`${NAV_URL}/Employee/update-profile-picture`, formData, {
      responseType: 'text',
      headers: this.getHeaders(),
    });
  }

  getProfilePicture(userId: number): Observable<Blob> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get(`${NAV_URL}/Employee/profile-picture`, {
      params,
      responseType: 'blob',
      headers: this.getHeaders(),
    });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${NAV_URL}/Employee/${userId}`, {
      headers: this.getHeaders(),
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  // ⬇️ Get logged-in user's email from JWT token
  getLoggedInEmail(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.email || ''; // adjust as per your backend
    } catch (e) {
      console.error('Error decoding token for email:', e);
      return '';
    }
  }

  register(payload: any) {
    return this.http.post(`${NAV_URL}/Employee/register`, payload);
  }

  login(credentials: any) {
    return this.http.post(`${NAV_URL}/Employee/login`, credentials);
  }

  setToken(token: string) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  clearToken() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      console.error('Error decoding token for role:', e);
      return null;
    }
  }
}

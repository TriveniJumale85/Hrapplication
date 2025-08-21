import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  private baseUrl = 'http://localhost:8080/api/forgotPassword';

  constructor(private http: HttpClient) {}

  // Step 1: Request OTP
  requestOtp(email: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/${email}`, {}, { responseType: 'text' });
  }

  // Step 2: Reset Password
  resetPassword(email: string, otp: string, password: string, confirmPassword: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/resetPassword/${email}`, 
      { otp, password, confirmPassword },
      { responseType: 'text' }
    );
  }
}

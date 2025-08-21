import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from '../../../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  otp = '';
  password = '';
  confirmPassword = '';
  step = 1;

  passwordStrength = 0;
alertType: any;
alertMessage: any;

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private toastr: ToastrService
  ) {}

  sendOtp(): void {
    if (!this.email) {
      this.toastr.warning('Please enter your email.');
      return;
    }
    this.forgotPasswordService.requestOtp(this.email).subscribe({
      next: (res: any) => {
        this.toastr.success(res || 'OTP sent successfully');
        this.step = 2;
      },
      error: (err: any) => {
        this.toastr.error(err?.error || 'Failed to send OTP');
      }
    });
  }
  showAlert(message: string, type: 'success' | 'error') {
  this.alertMessage = message;
  this.alertType = type;
  setTimeout(() => {
    this.alertMessage = '';
  }, 5000);
}

  resetPassword(): void {
    if (this.password !== this.confirmPassword) {
      this.toastr.warning('Passwords do not match.');
      return;
    }
    if (this.passwordStrength < 30) {
      this.toastr.warning('Password is too weak.');
      return;
    }
    this.forgotPasswordService
      .resetPassword(this.email, this.otp, this.password, this.confirmPassword)
      .subscribe({
        next: (res: any) => {
          this.toastr.success(res || 'Password reset successful');
          this.step = 1;
          this.clearFields();
        },
        error: (err: any) => {
          this.toastr.error(err?.error || 'Failed to reset password');
        }
      });
  }

  checkPasswordStrength(password: string) {
    let strength = 0;
    if (!password) {
      this.passwordStrength = 0;
      return;
    }
    if (password.length >= 6) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    this.passwordStrength = strength;
  }

  clearFields() {
    this.email = '';
    this.otp = '';
    this.password = '';
    this.confirmPassword = '';
    this.passwordStrength = 0;
  }
}

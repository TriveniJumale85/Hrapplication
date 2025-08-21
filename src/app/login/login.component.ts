
//!===========// working code //====================


import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword: boolean = false;
  email = '';
  password = '';
  message = ''; // for Bootstrap alert
  alertType = 'danger'; // Bootstrap alert class: success, danger etc.

  constructor(
    private auth: AuthService,
    private router: Router,
    // private toastr: ToastrService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const credentials = { email: this.email, password: this.password };

    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token);

        localStorage.setItem(
          'userData',
          JSON.stringify({
            id: res.id,
            email: res.email,
            EmployeeId: res.EmployeeId
          })
        );

        // Toastr notification
        // this.toastr.success('Login successful!', 'Welcome');
        this.message = ''; // clear previous messages

        const role = this.auth.getRoleFromToken();
        if (role === 'USER') this.router.navigate(['user-home']);
        else if (role === 'HR') this.router.navigate(['hr-home']);
        else if (role === 'MANAGER') this.router.navigate(['manager-home']);
        else if (role === 'SENIORHR') this.router.navigate(['senior-hr-home']);
        else this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Login error:', err);

        // Show both toast & inline alert
        // this.toastr.error('Incorrect email or password', 'Login Failed');

        this.message =
          err?.error?.message || 'Incorrect email or password. Please try again.';
        this.alertType = 'danger';
      }
    });
  }
}



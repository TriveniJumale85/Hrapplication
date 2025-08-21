
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  role = 'USER';
  employeeId: number | null = null;
  message = '';
  alertType = 'success';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const payload = {
      email: this.email,
      password: this.password,
      role: this.role,
      employeeId: this.employeeId
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.message = 'Registration successful!';
        this.alertType = 'success';
      },
      error: (err) => {
        this.message = err.error || 'Registration failed';
        this.alertType = 'danger';
      }
    });
  }
}

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from './login/login.component';

import { AuthService } from '../services/auth.service';
import { signal } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HrmsFrontend';

  constructor(public authService: AuthService) {}
}


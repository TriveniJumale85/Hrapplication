import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeService } from '../../../services/add-employee.service';

declare var bootstrap: any;
@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css'
})
export class AllUserComponent  {
}



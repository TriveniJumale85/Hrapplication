import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendance-info',
  standalone: true,
  imports: [

   
 
 
  ReactiveFormsModule,
  FormsModule,

  
  ],
  templateUrl: './attendance-info.component.html',
  styleUrl: './attendance-info.component.css'
})
export class AttendanceInfoComponent {
 attendanceData = [
   
    {
      name: 'Nikhil Ade',
      date: '2025-07-01',
      status: 'Present',
      inTime: '09:05 AM',
      outTime: '06:10 PM'
    },
    {
      name: 'Samtha Kale',
      date: '2025-07-01',
      status: 'Absent',
      inTime: '-',
      outTime: '-'
    },
    {
      name: 'Damini Patil',
      date: '2025-07-01',
      status: 'Leave',
      inTime: '-',
      outTime: '-'
    }
  ];
}
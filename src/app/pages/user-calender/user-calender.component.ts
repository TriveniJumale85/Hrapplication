import { Employee } from './../../../services/performance-review.service';

// ? testing 2

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AttendanceService } from '../../../services/attendance.service';

@Component({
  selector: 'app-user-calender',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-calender.component.html',
  styleUrl: './user-calender.component.css',
})
export class UserCalenderComponent {
  currentMonth: number;
  currentYear: number;
  currentMonthName: string = '';
  monthDays: string[] = [];
  blanksBeforeFirstDay: any[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  attendanceData = [] as any[]; // Adjusted type to any[] for flexibility

  employeeId: number =
    JSON.parse(localStorage.getItem('userData') || '{}').EmployeeId || 0;

  // attendanceData = [
  //   { date: '2025-06-30', status: 'P', shift: 'GEN' },
  //   { date: '2025-07-01', status: 'P', shift: 'GEN' },
  //   { date: '2025-07-02', status: 'L', shift: 'GEN' }
  // ];

  constructor(private attendanceService: AttendanceService) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.updateCalendar();
  }

  ngOnInit(): void {
    this.getAttendanceData();
    console.log(this.employeeId);
  }

  getAttendanceData() {
    // Simulate fetching attendance data from a service or API
    const backendMonth = this.currentMonth + 1; // because backend expects 1-12
    this.attendanceService
      .getEmployeeCalendar(this.employeeId, this.currentYear, backendMonth)
      .subscribe({
        next: (data: any[]) => {
          this.attendanceData = data;
        },
        error: (err) => {
          console.error('Failed to load calendar data:', err);
          this.attendanceData = [];
        },
      });
  }

  updateCalendar() {
    const date = new Date(this.currentYear, this.currentMonth);
    this.currentMonthName = date.toLocaleString('default', { month: 'long' });
    this.monthDays = this.generateMonthDays(
      this.currentYear,
      this.currentMonth
    );
    const firstDayIndex = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    this.blanksBeforeFirstDay = new Array(firstDayIndex);
  }

  generateMonthDays(year: number, month: number): string[] {
    const days: string[] = [];
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= totalDays; i++) {
      const dayStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i
        .toString()
        .padStart(2, '0')}`;
      days.push(dayStr);
    }
    return days;
  }

  goToNextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  goToPreviousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  getAttendanceForDate(date: string): { status: string; shift: string } | null {
    const attendance = this.attendanceData.find((item) => item.date === date);
    if (attendance) return attendance;

    const dayOfWeek = new Date(date).getDay(); // 0 = Sun, 6 = Sat
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return { status: 'O', shift: '' };
    }

    return null;
  }
}

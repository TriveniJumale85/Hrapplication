import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AttendanceService } from './../../../services/attendance.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HolidayService } from './../../../services/holidays.service';
import { HelpdeskService } from '../../../services/helpdesk.service';
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-hr-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule,RouterModule],
  templateUrl: './hr-home.component.html',
  styleUrl: './hr-home.component.css'
})
export class HrHomeComponent implements OnInit, OnDestroy {
  timeString: string = '';
  currentDate: string = '';
  holidays: any[] = [];
  isSignedIn: boolean = false;
  signInTime: string = ''; // ✅ Stores sign-in time for display
  tickets: any[] = [];
 
isLoading = false;
 
  attendanceData = {
    employeeId: JSON.parse(localStorage.getItem('userData') || '{}').EmployeeId || '',
    location: '',
    remarks: '',
    time: ''
  };
  router: any;
 goToPayslip() {
    this.router.navigate(['/hr-generate-salary']);
  }
  private intervalId: any;
upcomingHolidays: any;
 
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private AttendanceService: AttendanceService,
    private holidayService: HolidayService,
    private helpDeskService: HelpdeskService
  ) {}
 
  ngOnInit(): void {
    this.updateTime();
    this.updateDate();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    this.getHolidays();
    this.getStatus();
    this.signInTime = localStorage.getItem('signInTime') || '-'; // ✅ Load saved time
    this.loadTickets();
  }
 
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
 
  updateTime(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.timeString = `${hours}:${minutes}:${seconds}`;
  }
 
  updateDate(): void {
    const now = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' } as const;
    this.currentDate = now.toLocaleDateString('en-GB', options);
  }
 
   signIn() {
  if (!this.attendanceData.location) {
    this.toastr.warning('Please enter location');
    return;
  }
 
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('en-GB', { hour12: false });
 
  this.attendanceData.time = formattedTime;
 
  this.AttendanceService.signIn(this.attendanceData).subscribe({
    next: () => {
      this.isSignedIn = true;
      this.signInTime = formattedTime;
      localStorage.setItem('signInTime', formattedTime);
      this.toastr.success('Sign-in successful!', 'Success');
 
      const modalElement = document.getElementById('workLocationModal');
      if (modalElement) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
 
      // Clear input for next time
      this.attendanceData.location = '';
    },
    error: (err) => {
      let errorMessage = 'An error occurred';
      if (err.error) {
        if (typeof err.error === 'string') {
          errorMessage = err.error;
        } else if (err.error.message) {
          errorMessage = err.error.message;
        }
      }
      this.toastr.error(errorMessage, 'Error');
    },
  });
}
 
 
 
  signOut() {
    this.AttendanceService.signOut(this.attendanceData.employeeId).subscribe({
      next: () => {
        this.toastr.success('Sign-out successful!', 'Success');
        this.isSignedIn = false;
        // ✅ Optional: don't remove signInTime to persist in modal
        // localStorage.removeItem('signInTime');
      },
      error: (err) => {
        this.toastr.error(err.error || 'Error during sign-out');
      },
    });
  }
 
  getStatus() {
    this.AttendanceService.getStatus(this.attendanceData.employeeId).subscribe({
      next: (res: any[]) => {
        const signedInRecord = res.find((a) => a.issingin === 'TRUE');
        this.isSignedIn = !!signedInRecord;
      },
      error: () => {
        this.isSignedIn = false;
      },
    });
  }
 
 
 getHolidays() {
 this.holidayService.getHolidays().subscribe({
      next: (data) => {
        const today = new Date();
        this.holidays = data
          .filter((h: any) => new Date(h.date) >= today) // फक्त upcoming
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      error: (err) => {
        console.error('Failed to load holidays', err);
      }
    });
  }
 
 
  openSwipeModal() {
    const modalElement = document.getElementById('swipeModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
 
 
 
 
 
 
 
loadTickets(): void {
    this.isLoading = true;
    this.helpDeskService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
 
getCategoryIcon(category: string): string {
  switch (category.toLowerCase()) {
    case 'employee':
      return 'bi-person-badge';
    case 'tax':
      return 'bi-cash-stack';
    case 'loan':
      return 'bi-bank';
    case 'payslip':
      return 'bi-file-earmark-text';
    default:
      return 'bi-question-circle';
  }
}
 
 
 getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'bg-danger';
      case 'MEDIUM':
        return 'bg-warning text-dark';
      case 'LOW':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }
 
 
 
}
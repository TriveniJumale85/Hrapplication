import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PayslipsService } from '../../../services/payslips.service';


@Component({
  selector: 'app-user-payslip',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})

export class PayslipComponent implements OnInit {

  salaryRecords: any[] = [];

  userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userEmail: string = this.userData.email || '';
  EmployeeId: number=this.userData.EmployeeId || 0;

  constructor(private PayslipsService: PayslipsService) {}

  ngOnInit(): void {
    this.fetchRecords();
    console.log(this.salaryRecords);
  }

  fetchRecords() {
    this.PayslipsService.getSalaryByEmail(this.userEmail).subscribe((res) => {
      this.salaryRecords = res;
      console.log('Fetched salary records:', this.salaryRecords);
    });
  }

  downloadFile(id: number, fileName: string) {
    this.PayslipsService.downloadById(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PayslipsService } from '../../../services/payslips.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var bootstrap: any;


@Component({
  selector: 'app-manager-pyslip',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './manager-pyslip.component.html',
  styleUrls: ['./manager-pyslip.component.css']
})

export class ManagerPyslipComponent implements OnInit {

salaryRecords: any[] = [];
  previewUrl: SafeResourceUrl | null = null;
  previewedBlobUrl: string | null = null; // For download

  userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userEmail: string = this.userData.email || '';
  EmployeeId: number = this.userData.EmployeeId || 0;

  constructor(private payslipsService: PayslipsService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords() {
    this.payslipsService.getSalaryByEmail(this.userEmail).subscribe((res) => {
      this.salaryRecords = res;
      console.log('Fetched salary records:', this.salaryRecords);
    });
  }

  previewFile(id: number) {
    this.payslipsService.downloadById(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);

      // Sanitize URL for iframe preview
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.previewedBlobUrl = url; // Store for download

      // Open Bootstrap Modal
      const modalElement = document.getElementById('previewModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    });
  }

  downloadFile(fileName: string) {
    if (!this.previewedBlobUrl) {
      alert('Please preview the document first before downloading.');
      return;
    }

    const a = document.createElement('a');
    a.href = this.previewedBlobUrl;
    a.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    a.click();

    window.URL.revokeObjectURL(this.previewedBlobUrl);
    this.previewedBlobUrl = null; // Reset after download
  }
}

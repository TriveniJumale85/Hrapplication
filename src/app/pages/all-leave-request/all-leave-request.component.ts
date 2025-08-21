import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApplyLeavesService } from '../../../services/apply-leaves.service';




// Type definitions inline
type LeaveType = 'SICK' | 'CASUAL' | 'PAID' | 'UNPAID'|'MATERNITY';
type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface LeaveRequest {
  leaveId?: number;
  employeeId: number;
  fromDate: string;
  toDate: string;
  reason: string;
  applyingTo: string;
  ccTo: string[];
  contactDetails: string;
  leaveType: LeaveType;
  status?: LeaveStatus;
}

@Component({
  selector: 'app-all-leave-request',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ,HttpClientModule],
  templateUrl: './all-leave-request.component.html',
  styleUrl: './all-leave-request.component.css'
})




export class ApplyLeavesComponent {
  leaveForm: FormGroup;
  selectedFile: File | null = null;
  leaveTypes: LeaveType[] = ['SICK', 'CASUAL', 'PAID', 'UNPAID','MATERNITY'];

  constructor(private fb: FormBuilder, private applyLeavesService: ApplyLeavesService) {

    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required],
      applyingTo: ['', [Validators.required, Validators.email]],
      ccTo: [''],
      contactDetails: ['', Validators.required],
      leaveType: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitForm(): void {
  if (this.leaveForm.invalid) return;

  const formVal = this.leaveForm.value;

  // ✅ 1. User entered CC emails (split by comma)
  let userCCs = formVal.ccTo
    ? formVal.ccTo.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  // ✅ 2. Manual CCs (you wanted these manually fixed)
  const manualCCs = ['hr@gmail.com', 'manager@gmail.com'];

  // ✅ 3. Combine and remove duplicates
  const finalCC = Array.from(new Set([...userCCs, ...manualCCs]));

  // ✅ 4. Build JSON part as string (because backend expects string as in curl)
  const jsonPart = JSON.stringify({
    employeeId: Number(formVal.employeeId),
    fromDate: formVal.fromDate,
    toDate: formVal.toDate,
    reason: formVal.reason,
    applyingTo: formVal.applyingTo,
    ccTo: finalCC.join(','),  // ✅ Backend expects comma-separated string here
    contactDetails: formVal.contactDetails,
    leaveType: formVal.leaveType
  });

  const formData = new FormData();
  formData.append('request', new Blob([jsonPart], { type: 'application/json' }));

  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }

  this.applyLeavesService.applyLeave(formData).subscribe({
    next: () => {
      alert('Leave applied successfully.');
      this.leaveForm.reset();
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Error applying leave:', err);
      alert('Error applying leave: ' + (err.message || 'Unknown error'));
    }
  });
}
}

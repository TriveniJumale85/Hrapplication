import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApplyLeavesService } from '../../../services/apply-leaves.service';

@Component({
  selector: 'app-manager-applyleave',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ToastrModule,NgSelectModule],
  templateUrl: './manager-applyleave.component.html',
  styleUrl: './manager-applyleave.component.css'
})
export class ManagerApplyleaveComponent {
  leaveForm: FormGroup;
  selectedFile: File | null = null;
  leaveTypes = ['SICK', 'CASUAL', 'PAID', 'UNPAID', ];
  today = new Date().toISOString().split('T')[0]; 
  emailList: any[] = [];
  employeeId = JSON.parse(localStorage.getItem('userData') || '{}').EmployeeId || '';

  constructor(
    private fb: FormBuilder,
    private applyLeavesService: ApplyLeavesService,
    private toastr: ToastrService
  ) {
    this.leaveForm = this.fb.group({
      fromDate: ['', [Validators.required]], 
       toDate: ['', [Validators.required,]],
      reason: ['', Validators.required],
      applyingTo: ['', [Validators.required, Validators.email]],
      ccTo: [''],
      contactDetails: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      leaveType: ['', Validators.required]
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.fetchEmailList();
  }

  // ✅ Prevent past dates
  noPastDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today ? { pastDate: true } : null;
  }
  

   // ✅ To date must be same or after from date
dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const from = new Date(group.get('fromDate')?.value);
  const to = new Date(group.get('toDate')?.value);
 
  if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
    if (to < from) {
      return { invalidRange: true }; // ❌ जर To < From असेल तर error
    }
  }
  return null;
}
 

  // ✅ File validation
  onFileChange(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
      ];

      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Only Images, PDF, DOC, DOCX files are allowed.', 'Invalid File ❌');
        event.target.value = ''; // reset file input
        this.selectedFile = null;
        return;
      }

      // ✅ optional size check (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.toastr.error('File size must be less than 5MB.', 'Too Large ❌');
        event.target.value = '';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file; // ✅ valid file
    }
  }

  submitForm(): void {
    if (this.leaveForm.invalid) {
      this.toastr.error('Please fill all required fields correctly.', 'Invalid Form');
      return;
    }

    const formVal = this.leaveForm.value;
    let userCCs: string[] = [];

    if (formVal.ccTo && Array.isArray(formVal.ccTo)) {
      userCCs = formVal.ccTo.map((e: any) => e.email).filter(Boolean);
    }

    if (userCCs.length > 2) {
      this.toastr.error('You can enter only up to 2 CC emails.', 'Too Many CCs');
      return;
    }

    const manualCCs = ['hr@gmail.com', 'manager@gmail.com'];
    const remainingSlots = 2 - userCCs.length;
    const manualToAdd = manualCCs.slice(0, remainingSlots);
    const finalCC = [...userCCs, ...manualToAdd];

    const jsonPart = JSON.stringify({
      employeeId: this.employeeId,
      fromDate: formVal.fromDate,
      toDate: formVal.toDate,
      reason: formVal.reason,
      applyingTo: formVal.applyingTo,
      ccTo: finalCC.join(','), 
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
        this.toastr.success('Leave applied successfully.', 'Success ✅');
        this.leaveForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Error applying leave:', err);
        this.toastr.error(err?.error || 'Failed to apply leave.', 'Error ❌');
      }
    });
  }

  fetchEmailList(): void {
    this.applyLeavesService.getCcToEmployees().subscribe({
      next: (data: any[]) => {
        this.emailList = data;
        console.log('Email list loaded:', this.emailList);
      },
      error: (err) => {
        console.error('Failed to load email list', err);
      }
    });
  }
}

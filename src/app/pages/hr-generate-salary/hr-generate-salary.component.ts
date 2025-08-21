import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SalaryService } from '../../../services/salary.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeService } from '../../../services/add-employee.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';

@Component({
  selector: 'app-hr-generate-salary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './hr-generate-salary.component.html',
  styleUrl: './hr-generate-salary.component.css',
})
export class HrGenerateSalaryComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string = '';
  empMailList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private authService: AuthService,
    private addEmployeeService: AddEmployeeService,
    private toastr: ToastrService
  ) {
    this.uploadForm = this.fb.group({
      uploadedBy: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      userEmail: [
        '',
        [Validators.required, Validators.email, this.lowercaseEmailValidator]
      ],
      role: ['HR'],
    });
  }

  ngOnInit(): void {
    const email = this.authService.getLoggedInEmail();
    this.uploadForm.patchValue({ uploadedBy: email });
    this.EmailExistsCheck();
  }

  lowercaseEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value !== value.toLowerCase()) {
      return { notLowercase: true };
    }
    return null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        this.fileError = 'Only PDF files are allowed.';
        this.selectedFile = null;
        input.value = '';
        return;
      }
      this.selectedFile = file;
      this.fileError = '';
    }
  }

  onSubmit(): void {
  const email = this.uploadForm.get('userEmail')?.value?.trim().toLowerCase();

  // ✅ Email existence check
  if (!this.empMailList.includes(email)) {
    this.toastr.error('Email does not exist in database');
    return; // stop submission
  }

  // ✅ Form validation check
  if (this.uploadForm.invalid || !this.selectedFile) {
    this.fileError = this.selectedFile ? '' : 'Please select a PDF file.';
    this.toastr.error('Please fill all fields and upload a valid PDF file.');
    return;
  }

  // ✅ Proceed with form submission
  const formData = new FormData();
  const formValue = this.uploadForm.getRawValue();

  formData.append('file', this.selectedFile);
  formData.append('uploadedBy', formValue.uploadedBy);
  formData.append('userEmail', formValue.userEmail);
  formData.append('role', formValue.role);

  this.salaryService.uploadSalary(formData).subscribe({
    next: () => {
      this.toastr.success('Salary slip uploaded successfully!');
      this.uploadForm.reset();
      this.selectedFile = null;
      this.fileError = '';
      const email = this.authService.getLoggedInEmail();
      this.uploadForm.patchValue({ uploadedBy: email });
    },
    error: (err: any) => {
      console.error('Upload error:', err);
      this.toastr.error('Salary slip failed.');
    },
  });
}


  EmailExistsCheck() {
    this.addEmployeeService.getEmployees().subscribe({
      next: (res) => {
        this.empMailList = res.map(emp => emp.email?.toLowerCase());
        console.log('✅ Employee emails:', this.empMailList);
      },
      error: (err) => {
        console.error('❌ Error fetching employees:', err);
        this.toastr.error('Failed to load employee list');
      }
    });
  }

  onUserEmailInput(event: Event) {
    const email = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (email && !this.empMailList.includes(email)) {
      this.toastr.error('Email does not exist in database');
      this.uploadForm.get('userEmail')?.setErrors({ notFound: true });
    } else {
      const errors = this.uploadForm.get('userEmail')?.errors;
      if (errors) {
        delete errors['notFound'];
        if (Object.keys(errors).length === 0) {
          this.uploadForm.get('userEmail')?.setErrors(null);
        } else {
          this.uploadForm.get('userEmail')?.setErrors(errors);
        }
      }
    }
  }
}

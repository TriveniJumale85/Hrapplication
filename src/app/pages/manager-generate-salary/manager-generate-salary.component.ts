import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalaryService } from '../../../services/salary.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-manager-generate-salary',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './manager-generate-salary.component.html',
  styleUrl: './manager-generate-salary.component.css'
})
export class ManagerGenerateSalaryComponent {
  getAllSlips() {
    throw new Error('Method not implemented.');
    }
    month: any;
    email: any;
    getSlipByMonth() {
    throw new Error('Method not implemented.');
    }
    downloadSlip(arg0: any,arg1: any) {
    throw new Error('Method not implemented.');
    }
    slips: any;
    onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
    }
      uploadForm: FormGroup;
      selectedFile: File | null = null;
    
      constructor(
        private fb: FormBuilder,
        private salaryService: SalaryService
      ) {
        // Initialize the form with validation
        this.uploadForm = this.fb.group({
          uploadedBy: ['', [Validators.required, Validators.email]],
          userEmail: ['', [Validators.required, Validators.email]],
          role: ['', Validators.required],
        });
      }
    
      // Handle file selection
      onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          this.selectedFile = input.files[0];
          console.log('Selected file:', this.selectedFile);
        }
      }
    
      // Submit form data
      onSubmit(): void {
        
        if (this.uploadForm.invalid || !this.selectedFile) {
          alert('Please fill all fields and select a file.');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('uploadedBy', this.uploadForm.get('uploadedBy')?.value);
        formData.append('userEmail', this.uploadForm.get('userEmail')?.value);
        formData.append('role', this.uploadForm.get('role')?.value);
    
        this.salaryService.uploadSalary(formData).subscribe({
          next: (response) => {
           
            alert('File uploaded successfully!');
            this.uploadForm.reset();
            this.selectedFile = null;
          },
          error: (err: any) => {
            console.log(err)
          },
        });
      }
    }
    


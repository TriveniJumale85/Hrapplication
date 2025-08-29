import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HelpdeskService } from '../../../services/helpdesk.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-helpdesk',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './helpdesk.component.html',
  styleUrl: './helpdesk.component.css',
})
export class HelpDeskComponent implements OnInit {
  ticketForm: FormGroup;
  tickets: any[] = [];
  isLoading = false;
  fileUploadProgress: number | null = null;
  priorities = ['LOW', 'MEDIUM', 'HIGH'];

  employeeId = JSON.parse(localStorage.getItem('userData') || '{}').EmployeeId || '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helpDeskService: HelpdeskService,
  ) {
    this.ticketForm = this.fb.group({
      category: ['', [Validators.required, Validators.maxLength(50)]],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      priority: ['MEDIUM', Validators.required],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.helpDeskService.getTicketsByEmployeeId(this.employeeId).subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.ticketForm.patchValue({ file });
      this.ticketForm.get('file')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const formValue = this.ticketForm.value;

    const helpDeskPayload = {
      category: formValue.category,
      subject: formValue.subject,
      description: formValue.description,
      priority: formValue.priority,
      helpDeskStatus: 'PENDING',
      employee: { id: this.employeeId }
    };

    const formData = new FormData();
    formData.append('helpDesk', JSON.stringify(helpDeskPayload));

    if (formValue.file) {
      formData.append('file', formValue.file);
    }

    this.isLoading = true;
    this.fileUploadProgress = 0;

    this.helpDeskService.createTicket(formData).subscribe({
      next: () => {
        this.ticketForm.reset({ priority: 'MEDIUM' });
        this.loadTickets();
        this.fileUploadProgress = null;
        this.toastr.success('Ticket created successfully!');
      },
      error: () => {
        this.isLoading = false;
        this.fileUploadProgress = null;
      }
    });
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGH': return 'bg-danger';
      case 'MEDIUM': return 'bg-warning text-dark';
      case 'LOW': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}

import { Component, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HelpdeskService } from '../../../services/helpdesk.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {  ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-hr-helpdesk',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],

  templateUrl: './hr-helpdesk.component.html',
  styleUrl: './hr-helpdesk.component.css'
})
export class HrHelpdeskComponent {

  ticketForm: FormGroup;
  tickets: any[] = [];
  isLoading = false;
  fileUploadProgress: number | null = null;
  priorities = ['LOW', 'MEDIUM', 'HIGH'];

helpDeskStatuses = ['PENDING', 'APPROVED', 'REJECTED'];


  constructor(
    private fb: FormBuilder,
    private helpDeskService: HelpdeskService,
    private toastr: ToastrService
  ) {
    this.ticketForm = this.fb.group({
      category: ['', [Validators.required, Validators.maxLength(50)]],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      ccTo: [''],
      priority: ['MEDIUM', Validators.required],
      file: [null],
      // HelpDeskStatus: ['PENDING', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }




onStatusChange(event: Event, ticketId: number) {
  const selectElement = event.target as HTMLSelectElement;
  const newStatus = selectElement.value;

  if (!newStatus) return;

  this.helpDeskService.updateTicketStatus(ticketId, newStatus).subscribe({
    next: () => {
      this.toastr.success(`Status updated to ${newStatus}`);
      this.loadTickets(); // refresh after update
    },
    error: () => {
      this.toastr.error('Failed to update status');
    }
  });
}




  updateTicketStatus(id: number, status: string): void {
    this.helpDeskService.updateTicketStatus(id, status).subscribe({
      next: () => {
        const ticket = this.tickets.find(ticket => ticket.id === id);
        if (ticket) {
          ticket.helpDeskStatus = status;
        }
        this.loadTickets();
        this.toastr.success('Ticket status updated successfully');
      },
    error: (err) => console.error('Error updateTicketStatus request:', err)

    });
  }

  deleteTicket(id: number): void {
  if (confirm('Are you sure you want to delete this ticket?')) {
    this.helpDeskService.deleteTicket(id).subscribe(() => {
      this.tickets = this.tickets.filter(ticket => ticket.id !== id);
      this.loadTickets(); // Reload tickets after deletion
      this.toastr.success('Ticket deleted successfully');
    });
  }
}

  downloadFile(id: number): void {
    this.helpDeskService.downloadFile(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-${id}-attachment`;
      a.click();
      window.URL.revokeObjectURL(url);
      this.toastr.success('File downloaded successfully');
    });
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

}



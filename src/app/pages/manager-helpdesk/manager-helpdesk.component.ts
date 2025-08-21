import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HelpdeskService } from '../../../services/helpdesk.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApplyLeavesService } from './../../../services/apply-leaves.service';


@Component({
  selector: 'app-manager-helpdesk',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule, ],
  templateUrl: './manager-helpdesk.component.html',
  styleUrl: './manager-helpdesk.component.css'
})
export class ManagerHelpdeskComponent {

  ticketForm: FormGroup;
  tickets: any[] = [];
  isLoading = false;
  fileUploadProgress: number | null = null;
  priorities = ['LOW', 'MEDIUM', 'HIGH'];
  emailList: any[] = [];

  statusList = ['PENDING','IN_PROGRESS','COMPLETED',];
  selectedStatus = '';

  constructor(
    private fb: FormBuilder,
    private helpDeskService: HelpdeskService,
    private applyLeavesService: ApplyLeavesService // Assuming this service has the method to fetch email list
  ) {
    this.ticketForm = this.fb.group({
      category: ['', [Validators.required, Validators.maxLength(50)]],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      ccTo: [''],
      priority: ['LOW', Validators.required],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.helpDeskService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.isLoading = false;
        // console.log('Tickets loaded:', this.tickets);
        
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }


  deleteTicket(id: number): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.helpDeskService.deleteTicket(id).subscribe(() => {
        this.loadTickets();
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


 filterByStatus(): void {
    if (!this.selectedStatus) {
      this.loadTickets();
      return;
    }

    this.isLoading = true;
    this.helpDeskService.getTicketsByStatus(this.selectedStatus).subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.isLoading = false;
        // console.log('Filtered tickets:', this.tickets);
      },
      error: () => {
        this.tickets = [];
        this.isLoading = false;
      }
    });
  }

 fetchEmailList(): void {
    this.applyLeavesService.getCcToEmployees().subscribe({
      next: (data: any[]) => {
        this.emailList = data;
        // console.log('Email list loadedfrom help desk :', this.emailList );
      },
      error: (err) => {
        console.error('Failed to load email list', err);
      }
    });
  }
  
  resetFilters(): void {
  this.selectedStatus = ''; // Dropdown reset
  this.loadTickets();       // All tickets reload
}


  
  updateStatus(id: number, newStatus: string): void {
  this.helpDeskService.updateTicketStatus(id, newStatus).subscribe({
    next: () => {
      this.loadTickets(); // Reload updated data
    },
    error: (err) => {
      console.error('Status update failed:', err);
      alert('Failed to update ticket status.');
    }
  });
}



}



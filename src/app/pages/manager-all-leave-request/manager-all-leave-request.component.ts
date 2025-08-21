import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeavestatusService } from '../../../services/leavestatus.service';

type LeaveType = 'SICK' | 'CASUAL' | 'PAID' | 'UNPAID' | 'MATERNITY';
type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

interface LeaveRequest {
  leaveId?: number;
  employeeId: number;
  employeeName?: string;
  fromDate: string;
  toDate: string;
  reason: string;
  applyingTo: string;
  ccTo: string[] | string;
  contactDetails: string;
  leaveType: LeaveType;
  status?: LeaveStatus;
  fileName?: string;
  documentUrl?: string;
  remarks?: string[];
  newRemark?: string;   // नया remark इनपुट
}

@Component({
  selector: 'app-all-leave-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-all-leave-request.component.html',
  styleUrls: ['./manager-all-leave-request.component.css']
})
export class ManagerAllLeaveRequestComponent {
  leaveRequests: LeaveRequest[] = [];
  leaveStatuses: LeaveStatus[] = ['PENDING', 'APPROVED', 'REJECTED'];

  constructor(private leaveStatusService: LeavestatusService) {}

  ngOnInit() {
    this.fetchLeaves();
  }

  /** ✅ leaves fetch */
  fetchLeaves() {
    this.leaveStatusService.getAllLeaves().subscribe({
      next: (data: any[]) => {
        this.leaveRequests = data.map((leave: any) => ({
          ...leave,
          ccTo: typeof leave.ccTo === 'string'
            ? leave.ccTo.split(',').map((s: string) => s.trim())
            : leave.ccTo || [],
          documentUrl: leave.leaveId
            ? `http://localhost:8080/api/leaves/download/${leave.leaveId}`
            : null,
          status: (leave.status || 'PENDING').toUpperCase() as LeaveStatus,
          remarks: leave.remarks || [],
          newRemark: ''
        }));
      },
      error: (err) => {
        console.error('Error fetching leaves', err);
      }
    });
  }

  /** ✅ status update */
  onStatusChange(event: Event, leaveId?: number) {
    if (!leaveId) return;

    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as LeaveStatus;

    const leave = this.leaveRequests.find(l => l.leaveId === leaveId);
    if (!leave) {
      alert('Leave request not found.');
      return;
    }

    //  validation
    if (leave.status === 'CANCELLED') {
      alert('Cancelled leaves cannot be updated.');
      this.fetchLeaves();
      return;
    }

    if (newStatus === 'CANCELLED') {
      alert('Cannot manually set status to CANCELLED.');
      this.fetchLeaves();
      return;
    }


    this.leaveStatusService.updateLeaveStatus(leaveId, newStatus).subscribe({
      next: () => {
        alert(`Leave #${leaveId} updated to ${newStatus}`);
        this.fetchLeaves();
      },
      error: (err: any) => {
        console.error('Failed to update leave status', err);
        alert('Failed to update leave status.');
      }
    });
  }

  /** ✅  remark add  option */
  saveRemark(leave: LeaveRequest) {
    if (!leave.leaveId) return;
    if (!leave.newRemark?.trim()) {
      alert('Please enter a remark.');
      return;
    }

    const remarkText = leave.newRemark.trim();

    this.leaveStatusService.addRemark(leave.leaveId, remarkText).subscribe({
      next: () => {
        leave.remarks = leave.remarks || [];
        leave.remarks.push(remarkText);
        leave.newRemark = '';
        alert('Remark added successfully.');
      },
      error: (err: any) => {
        console.error('Failed to add remark', err);
        if (err.status === 403) {
          alert('You are not authorized to add remarks. Please check your login role.');
        } else {
          alert('Failed to add remark.');
        }
      }
    });
  }
}

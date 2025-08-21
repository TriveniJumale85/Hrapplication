export interface LeaveRequest {
    leaveId?: number;
    employeeId: number;
    leaveType: string;
    fromDate: string; // ISO date string
    toDate: string;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  }
  
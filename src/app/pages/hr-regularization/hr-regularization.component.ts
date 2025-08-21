import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegularizationService, RegularizationAndPermission } from '../../../services/regularization.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-hr-regularization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-regularization.component.html',
})
export class HrRegularizationComponent implements OnInit {
  allRequests: RegularizationAndPermission[] = [];
  pendingRequests: RegularizationAndPermission[] = [];
  processedRequests: RegularizationAndPermission[] = [];
 
  constructor(private regularizationService: RegularizationService,
    private toastr: ToastrService
  ) {}
 
  ngOnInit(): void {
    this.loadAndCategorizeRequests();
  }
 
  loadAndCategorizeRequests(): void {
    this.regularizationService.getAllRequests().subscribe({
      next: (data) => {
        this.allRequests = data;
        this.pendingRequests = data.filter(r => r.approvalStatus === 'PENDING');
        this.processedRequests = data.filter(r =>
          r.approvalStatus === 'APPROVED' || r.approvalStatus === 'REJECTED'
        );
        console.log("Pending:", this.pendingRequests);
        console.log("Processed:", this.processedRequests);
      },
      error: (error) => {
        console.error('Failed to load requests:', error);
      }
    });
  }
 
// <<<<<<< HEAD
//   approve(id: number): void {
//     this.regularizationService.approveRequest(id).subscribe({
//       next: () => {
//         const req = this.pendingRequests.find(r => r.id === id);
//         if (req) {
//           req.approvalStatus = 'APPROVED';
//           this.moveToProcessed(req);
//           this.toastr.success('Request approved successfully');
//         }
//       },
//       error: (err) => {
//         console.error('Error approving request:', err);
//         this.toastr.error('Failed to approve request');
//       }
//     });
//   }
 
//   reject(id: number): void {
//     this.regularizationService.rejectRequest(id).subscribe({
//       next: () => {
//         const req = this.pendingRequests.find(r => r.id === id);
//         if (req) {
//           req.approvalStatus = 'REJECTED';
//           this.moveToProcessed(req);
//           this.toastr.success('Request rejected successfully');
//         }
//       },
//       error: (err) => {
//         console.error('Error rejecting request:', err);
//         this.toastr.error('Failed to reject request');
//       }
//     });
//   }
// =======
approve(id: number): void {
  this.regularizationService.approveRequest(id).subscribe({
    next: () => {
      const req = this.pendingRequests.find(r => r.id === id);
      if (req) {
        req.approvalStatus = 'APPROVED';
        this.moveToProcessed(req);
      }
    },
    error: (err) => console.error('Error approving request:', err)
  });
}
 
reject(id: number): void {
  this.regularizationService.rejectRequest(id).subscribe({
    next: () => {
      const req = this.pendingRequests.find(r => r.id === id);
      if (req) {
        req.approvalStatus = 'REJECTED';
        this.moveToProcessed(req);
      }
    },
    error: (err) => console.error('Error rejecting request:', err)
  });
}
 
// >>>>>>> a449b97163edcf6953ffc36fc6cba42f161be8b3
 
  deleteRequest(id: number): void {
    this.regularizationService.deleteRequest(id).subscribe({
      next: () => {
        this.pendingRequests = this.pendingRequests.filter(r => r.id !== id);
        this.processedRequests = this.processedRequests.filter(r => r.id !== id);
        // console.log(`Deleted request with id ${id}`);
        this.toastr.success('Request deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting request:', err);
        this.toastr.error('Failed to delete request');
      }
    });
  }
 
  private moveToProcessed(request: RegularizationAndPermission): void {
    this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
    this.processedRequests.push(request);
  }
}
 
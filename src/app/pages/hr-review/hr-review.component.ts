import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PerformanceReview, PerformanceReviewService } from '../../../services/performance-review.service';

@Component({
  selector: 'app-hr-review',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './hr-review.component.html',
  styleUrls: ['./hr-review.component.css']
})
export class HrReviewComponent implements OnInit {
  service = inject(PerformanceReviewService);
  reviews: PerformanceReview[] = [];

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.service.getAllReviews().subscribe((res) => {
      this.reviews = res.map(r => ({
        ...r,
        employee: { id: r.employeeId ?? 0 },
        task: { id: r.taskId ?? 0 },
        description: r.description || ''
      }));
    });
  }
}

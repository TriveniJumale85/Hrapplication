import { Component, OnInit } from '@angular/core';
import { PerformanceReview, PerformanceReviewService } from '../../../services/performance-review.service';


@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {

  reviews: PerformanceReview[] = []; // Store fetched reviews here
  userId: number = 1; // You can dynamically set this (e.g., from login user data)

  constructor(private reviewService: PerformanceReviewService) { }

  ngOnInit(): void {
    this.getUserReviews();
  }

  getUserReviews(): void {
    this.reviewService.getReviewsByEmployeeId(this.userId).subscribe({
      next: (data: PerformanceReview[]) => {
        this.reviews = data;
        console.log('User Reviews:', this.reviews);
      },
      error: (err: any) => {
        console.error('Error fetching user reviews:', err);
      }
    });
  }

}

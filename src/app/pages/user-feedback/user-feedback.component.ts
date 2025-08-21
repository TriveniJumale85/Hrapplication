import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-feedback.component.html',
  styleUrl: './user-feedback.component.css'
})
export class UserFeedbackComponent {
  activeTab: string = 'Received';
 
  tabs: string[] = ['Received', 'Given', 'Pending Requests', 'Drafts'];
 
  setTab(tab: string) {
    this.activeTab = tab;
  }
}

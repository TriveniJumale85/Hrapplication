import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hr-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './hr-feedback.component.html',
  styleUrl: './hr-feedback.component.css'
})
export class HrFeedbackComponent {
  activeTab: string = 'Received';
 
  tabs: string[] = ['Received', 'Given', 'Pending Requests', 'Drafts'];
 
  setTab(tab: string) {
    this.activeTab = tab;
  }
}

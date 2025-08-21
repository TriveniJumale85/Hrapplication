import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './manager-feedback.component.html',
  styleUrl: './manager-feedback.component.css'
})
export class ManagerFeedbackComponent {
  activeTab: string = 'Received';
 
  tabs: string[] = ['Received', 'Given', 'Pending Requests', 'Drafts'];
 
  setTab(tab: string) {
    this.activeTab = tab;
  }
}

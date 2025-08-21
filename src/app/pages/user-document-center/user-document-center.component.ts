// document-center.component.ts (Angular 17 standalone)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import this

@Component({
  selector: 'app-document-center',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule here
  templateUrl: './user-document-center.component.html',
  styleUrls: ['./user-document-center.component.css'],
})
export class UserDocumentCenterComponent {
  documents = [
    { icon: '📄', title: 'Documents', link: '/documents' },
    { icon: '💰', title: 'Payslips', link: '/payslips' },
    { icon: '🧾', title: 'Form 16', link: '/form16' },
    { icon: '📘', title: 'Company Policies', link: '/policies' },
    { icon: '📥', title: 'Forms', link: '/forms' },
    { icon: '✉️', title: 'Letters', link: '/letters' }
  ];
}

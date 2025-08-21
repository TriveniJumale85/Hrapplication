import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manager-document-center',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manager-document-center.component.html',
  styleUrl: './manager-document-center.component.css'
})
export class ManagerDocumentCenterComponent {
  documents = [
    { icon: '📄', title: 'Documents', link: '/documents' },
    { icon: '💰', title: 'Payslips', link: '/payslips' },
    { icon: '🧾', title: 'Form 16', link: '/form16' },
    { icon: '📘', title: 'Company Policies', link: '/policies' },
    { icon: '📥', title: 'Forms', link: '/forms' },
    { icon: '✉️', title: 'Letters', link: '/letters' }
  ];
}

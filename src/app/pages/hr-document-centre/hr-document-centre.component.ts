import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hr-document-centre',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hr-document-centre.component.html',
  styleUrl: './hr-document-centre.component.css'
})
export class HrDocumentCentreComponent {
  documents = [
    { icon: '📄', title: 'Documents', link: '/documents' },
    { icon: '💰', title: 'Payslips', link: '/payslips' },
    { icon: '🧾', title: 'Form 16', link: '/form16' },
    { icon: '📘', title: 'Company Policies', link: '/policies' },
    { icon: '📥', title: 'Forms', link: '/forms' },
    { icon: '✉️', title: 'Letters', link: '/letters' }
  ];
}

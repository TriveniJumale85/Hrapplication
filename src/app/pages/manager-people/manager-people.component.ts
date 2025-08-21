import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AddEmployeeService } from '../../../services/add-employee.service';

@Component({
  selector: 'app-people-people',

  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './manager-people.component.html',
  styleUrl: './manager-people.component.css',
})
export class ManagerPeopleComponent implements OnInit {
  openSearchMenu() {
throw new Error('Method not implemented.');
}
  employees: any[] = [];
  starredEmployees: any[] = [];
  defaultProfile: string = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
  activeTab: string = 'starred';
  selectedEmployee: any = null;
  searchTerm: string = '';
  starredSearchTerm: string = '';

  constructor(private addEmployeeService: AddEmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.addEmployeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res.map((emp: any) => ({
          ...emp,
          isStarred: emp.isStarred || false
        }));
        this.starredEmployees = this.employees.filter(emp => emp.isStarred);
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  filteredEmployees() {
    return this.employees.filter(emp =>
      (`${emp.firstName} ${emp.lastName}`).toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  filteredStarredEmployees() {
    return this.starredEmployees.filter(emp =>
      (`${emp.firstName} ${emp.lastName}`).toLowerCase()
        .includes(this.starredSearchTerm.toLowerCase())
    );
  }

  selectEmployee(emp: any) {
    this.selectedEmployee = emp;
  }

toggleStar(emp: any) {
  // Find employee in main list
  const empInMain = this.employees.find(e => e.id === emp.id);
  if (empInMain) {
    empInMain.isStarred = !empInMain.isStarred;
  }

  // Update starred list
  if (empInMain?.isStarred) {
    if (!this.starredEmployees.find(e => e.id === emp.id)) {
      this.starredEmployees.push(empInMain);
    }
  } else {
    this.starredEmployees = this.starredEmployees.filter(e => e.id !== emp.id);
  }

  // Keep selectedEmployee in sync
  if (this.selectedEmployee && this.selectedEmployee.id === emp.id) {
    this.selectedEmployee.isStarred = empInMain?.isStarred || false;
  }

  // Force change detection
  this.employees = [...this.employees];
  this.starredEmployees = [...this.starredEmployees];
}

}
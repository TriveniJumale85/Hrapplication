import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddEmployeeService } from '../../../services/add-employee.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-hr-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgSelectModule],
  templateUrl: './hr-task.component.html',
  styleUrl: './hr-task.component.css'
})
export class HrTaskComponent {
  assignee = JSON.parse(localStorage.getItem('userData') || '{}').email || '';
  taskForm: FormGroup;
  selectedFile: File | null = null;
  message = '';
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toster: ToastrService,
    private taskService: TaskService,
    private addEmployeeService: AddEmployeeService
  ) {
    this.taskForm = this.fb.group({
      assignee: [''],
      taskName: [''],
      description: [''],
      dueDate: [''],
      employeeId: [''],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }
  
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const task = {
      assignee: this.assignee,
      taskName: this.taskForm.value.taskName,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
    };

    const employeeId = this.taskForm.value.employeeId;

    this.taskService
      .createTask(task, this.selectedFile!, employeeId)
      .subscribe({
        next: (res: any) => {
          this.message = res;
          this.toster.success('Task created successfully');
          this.taskForm.reset();
        },
        error: (err: any) => {
          this.message = err.error;
          this.toster.error('Failed to create task');
          console.error('Error creating task:', err);
        },
      });
  }

  //! //  load employye and bind id

  loadEmployees() {
    this.addEmployeeService.getEmployees().subscribe({
        next: (res) => {
      // ✅ Combine full name for display
      this.employees = res.map(emp => ({
        id: emp.id,
        fullName: `${emp.firstName} ${emp.lastName}`
      }));
    },
      error: (err) => {
        console.error('❌ Error fetching employees:', err);
      },
    });
  }
}

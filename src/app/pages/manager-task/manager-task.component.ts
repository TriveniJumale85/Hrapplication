import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { AddEmployeeService } from '../../../services/add-employee.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './manager-task.component.html',
  styleUrl: './manager-task.component.css',
})
export class ManagerTaskComponent implements OnInit {
  assignee = JSON.parse(localStorage.getItem('userData') || '{}').email || '';
  taskForm: FormGroup;
  selectedFile: File | null = null;
  tasks: any[] = [];
  editingTask: any = null;
  employees: any[] = [];

  today: string = '';
  minDueDate: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private addEmployeeService: AddEmployeeService,
    private toastr: ToastrService
  ) {
   this.taskForm = this.fb.group({
  taskName: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]+$/) // फक्त letters, numbers, space allow
    ]
  ],
  description: ['', Validators.required],
  priority: ['', Validators.required],
  status: ['PENDING'],
  dueDate: ['', Validators.required],
  taskAssignDate: ['', Validators.required],
  employeeId: ['', Validators.required],
});

  }

  ngOnInit(): void {
    this.setTodayAsMinAssignDate();
    this.loadTasks();
    this.loadEmployees();
  }

  setTodayAsMinAssignDate() {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  onAssignDateChange() {
    const assignDate = this.taskForm.get('taskAssignDate')?.value;
    if (assignDate) {
      this.minDueDate = assignDate;
      this.taskForm.get('dueDate')?.reset();
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.toastr.error('Please fill all required fields correctly');
      return;
    }

    const assign = this.taskForm.value.taskAssignDate;
    const due = this.taskForm.value.dueDate;

    if (new Date(due) < new Date(assign)) {
      this.toastr.error('Due Date must be same or after Assign Date');
      return;
    }

    const task = {
      assignee: this.assignee,
      taskName: this.taskForm.value.taskName,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      status: this.taskForm.value.status,
      dueDate: due,
      taskAssignDate: assign,
    };

    const employeeId = this.taskForm.value.employeeId;

    this.taskService.createTask(task, this.selectedFile!, employeeId).subscribe({
      next: () => {
        this.toastr.success('Task created successfully');
        this.taskForm.reset();
        this.minDueDate = '';
        this.loadTasks();
      },
      error: (err) => {
        console.error('Error creating task:', err);
        this.toastr.error('Error creating task');
      }
    });
  }

  loadEmployees() {
    this.addEmployeeService.getEmployees().subscribe({
      next: (res: any) => {
        this.employees = res.map((emp: any) => ({
          id: emp.id,
          fullName: `${emp.firstName} ${emp.lastName}`,
        }));
      },
      error: (err: any) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onEdit(task: any) {
    this.editingTask = {
      ...task,
      dueDate: this.formatDateForInput(task.dueDate),
      taskAssignDate: this.formatDateForInput(task.taskAssignDate)
    };
  }

  updateTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe(() => {
        this.editingTask = null;
        this.loadTasks();
      });
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }
}

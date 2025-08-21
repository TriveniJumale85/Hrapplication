import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  employeeId: number = 0;
  loading: boolean = false;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.employeeId = user.EmployeeId;
    this.loadTasks();
  }

  loadTasks(): void {
  this.loading = true;
  this.taskService.getTasksByEmployeeId(this.employeeId).subscribe({
    next: (res: any[]) => {
      this.tasks = res;
      this.taskService.setTasks(res);  // 👈 Push to global observable
      this.loading = false;
      console.log('Tasks loaded:', this.tasks);

    },
    error: (err) => {
      this.loading = false;
      this.toastr.error('Failed to load tasks');
      console.error('Error loading tasks:', err);
    }
  });
}


  updateStatus(taskId: number, newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'): void {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe({
      next: (res) => {
        this.toastr.success('Task status updated successfully');
        this.loadTasks(); // 🔄 Refresh task list
      },
      error: (err) => {
        this.toastr.error('Failed to update task status');
        console.error('❌ Failed to update task status:', err);
      }
    });
  }
}

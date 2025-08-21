import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  RegularizationService,
  RequestPayload,
  RequestType,
  RegularizationAndPermission,
} from '../../../services/regularization.service';

@Component({
  selector: 'app-regularization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './regularization.component.html',
})
export class RegularizationComponent implements OnInit {
  employeeId = JSON.parse(localStorage.getItem('userData') || '{}').EmployeeId || '';

  requestType: RequestType = 'REGULARIZATION';
  pendingRequests: RegularizationAndPermission[] = [];
  today: string = '';
  timeError: boolean = false;

  form: RequestPayload = {
    requestType: this.requestType,
    reason: '',
    date: '',
    clockIn: '',
    clockOut: '',
    email: '',
  };

  constructor(private service: RegularizationService) {}

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
    // if default is PERMISSION then set date
    if (this.requestType === 'PERMISSION') {
      this.form.date = this.today;
    }
    this.loadEmployeeRequests();
    console.log('from regularization', this.employeeId);
  }

  onRequestTypeChange() {
    if (this.requestType === 'PERMISSION') {
      this.form.date = this.today;
    } else {
      this.form.date = '';
    }
    // clear times & validation when changing type
    this.form.clockIn = '';
    this.form.clockOut = '';
    this.timeError = false;
    this.loadEmployeeRequests();
  }

  /** convert "HH:MM" -> minutes so numeric compare is correct */
  private toMinutes(time: string) {
    const parts = (time || '').split(':');
    if (parts.length !== 2) return NaN;
    const hh = Number(parts[0]);
    const mm = Number(parts[1]);
    return hh * 60 + mm;
  }

  validateTime() {
    const inTime = this.form.clockIn;
    const outTime = this.form.clockOut;
    if (!inTime || !outTime) {
      this.timeError = false;
      return;
    }
    const inMin = this.toMinutes(inTime);
    const outMin = this.toMinutes(outTime);
    // if parsing failed, treat as invalid
    if (isNaN(inMin) || isNaN(outMin)) {
      this.timeError = true;
      return;
    }
    this.timeError = inMin > outMin;
  }

  loadEmployeeRequests(): void {
    const request$ =
      this.requestType === 'REGULARIZATION'
        ? this.service.getRegularizationsByEmployeeId(this.employeeId)
        : this.service.getPermissionsByEmployeeId(this.employeeId);

    request$.subscribe({
      next: (res) => {
        this.pendingRequests = res;
        console.log("from regularizationn user",  this.pendingRequests);
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      },
    });
  }

  submit(formRef: NgForm) {
    // re-validate times immediately
    this.validateTime();

    // template-driven form validity
    if (!formRef || !formRef.valid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.timeError) {
      alert('Clock-in time cannot be later than Clock-out time.');
      return;
    }

    this.form.requestType = this.requestType;

    const request$ =
      this.requestType === 'REGULARIZATION'
        ? this.service.requestRegularization(this.employeeId, this.form)
        : this.service.requestPermission(this.employeeId, this.form);

    request$.subscribe({
      next: (res) => {
        alert(`${this.requestType} request submitted successfully!`);
        // reset the template form state
        try {
          formRef.resetForm();
        } catch (e) {
          // ignore if resetForm not available
        }
        // restore model defaults
        this.resetFormModel();
        this.loadEmployeeRequests();
        this.closeModal();
      },
      error: (err) => {
        alert('Submission failed: ' + (err?.error?.message || err.message));
      },
    });
  }

  resetFormModel() {
    this.form = {
      requestType: this.requestType,
      reason: '',
      date: this.requestType === 'PERMISSION' ? this.today : '',
      clockIn: '',
      clockOut: '',
      email: '',
    };
    this.timeError = false;
  }

  /** hides bootstrap modal (works if bootstrap JS is loaded) */
  closeModal() {
    const modalEl = document.getElementById('regularizationModal');
    if (!modalEl) return;
    const win = window as any;
    if (win.bootstrap && win.bootstrap.Modal) {
      // get instance or create one then hide
      const instance =
        win.bootstrap.Modal.getInstance(modalEl) ||
        new win.bootstrap.Modal(modalEl);
      instance.hide();
    } else {
      // fallback: toggle classes (best-effort)
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HolidayService } from './../../../services/holidays.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-hr-holiday',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.css',
})
export class HolidayComponent implements OnInit {
  holidayForm: FormGroup;
  holidays: any[] = [];
  upcomingHolidays: any[] = [];
  minDate: string = '';

  successMessage = '';
  errorMessage = '';
  oisDeleting: boolean = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private holidayService: HolidayService
  ) {
    this.holidayForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      date: ['', [Validators.required, this.futureDateValidator]],
      description: ['', [Validators.pattern('^[A-Za-z ]*$')]]
    });
  }

  ngOnInit(): void {
  this.setMinDate();
  this.loadHolidays();

  // Holidays load झाल्यावर validator reset कर
  this.holidayForm.get('date')?.setValidators([
    Validators.required,
    this.futureDateValidator,
    this.duplicateDateValidator.bind(this)
  ]);
}

duplicateDateValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control.value) return null;
  const selectedDate = new Date(control.value).toDateString();
  const isDuplicate = this.holidays.some(h => new Date(h.date).toDateString() === selectedDate);
  return isDuplicate ? { duplicateDate: true } : null;
}


  setMinDate(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;
  }

  futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today ? null : { pastDate: true };
  }

loadHolidays(): void {
  this.holidayService.getHolidays().subscribe({
    next: (data) => {
      console.log("API Response:", data); // इथे description येते का बघ
      this.holidays = data.sort((a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    },
    error: () => {
      this.errorMessage = 'Failed to load holidays.';
    }
  });
}



  openModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('holidayModal'));
    modal.show();
  }

  closeModal(): void {
    const modalEl = document.getElementById('holidayModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
onSubmit(): void {
  if (this.holidayForm.valid) {
    const holidayData = this.holidayForm.value;

    // Duplicate date check
    const isDuplicate = this.holidays.some(
      h => new Date(h.date).toDateString() === new Date(holidayData.date).toDateString()
    );

    if (isDuplicate) {
      this.toastr.error('This date is already added as a holiday!', 'Error');
      return;
    }

    // If not duplicate, then save
    this.holidayService.createHoliday(holidayData).subscribe({
      next: () => {
        this.toastr.success('Holiday added successfully!', 'Success');
        this.resetForm();
        this.loadHolidays();
        this.closeModal();
      },
      error: () => {
        this.errorMessage = 'Failed to create holiday.';
      }
    });
  } else {
    this.errorMessage = 'Please fill all required fields.';
  }
}


  resetForm(): void {
    this.holidayForm.reset();
  }

  onDelete(id: number): void {
    this.oisDeleting = true;
    this.holidayService.deleteHoliday(id).subscribe({
      next: () => {
        this.holidays = this.holidays.filter(holiday => holiday.id !== id);
        this.toastr.success('Holiday deleted successfully!', 'Success');
        this.oisDeleting = false;
        this.loadHolidays(); // Reload to update upcoming list
      },
      error: () => {
        this.holidays = this.holidays.filter(holiday => holiday.id !== id);
        this.toastr.success('Holiday deleted successfully!', 'Success');
        this.oisDeleting = false;
        this.loadHolidays();
      }
    });
  }
}

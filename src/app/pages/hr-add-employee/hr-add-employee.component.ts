import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeService } from '../../../services/add-employee.service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-hr-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './hr-add-employee.component.html',
  styleUrl: './hr-add-employee.component.css'
})
export class HrAddEmployeeComponent implements OnInit {
openEditModal(emp: any) {
  if (!emp) return;

  this.closeAllModals(); // agar koi aur modal open ho to band kar do

  this.selectedEmployeeId = emp.id;
  this.editForm.patchValue({
    firstName: emp.firstName || '',
    lastName: emp.lastName || '',
    email: emp.email || '',
    phone: emp.phone || '',
    department: emp.department || '',
    jobTitle: emp.jobTitle || '',
    role: emp.role || '',
    status: emp.status || '',
    joiningDate: emp.joiningDate ? emp.joiningDate.split('T')[0] : '',
    exitDate: emp.exitDate ? emp.exitDate.split('T')[0] : ''
  });

  const modalEl = document.getElementById('editEmployeeModal');
  if (modalEl) {
    new bootstrap.Modal(modalEl).show();
  }
}

  employees: any[] = [];
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  registerForm!: FormGroup;

  selectedImage: File | null = null;
  selectedFile: File | null = null;
  selectedEmployeeId!: number;
  showPassword: boolean = false;
  minDate: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private addEmployeeService: AddEmployeeService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.getEmployees();



  this.employeeForm.get('email')?.valueChanges.subscribe(email => {
    if (email && this.isDuplicateEmail(email)) {
      this.toastr.error('This email ID already exists!');
      this.employeeForm.get('email')?.setErrors({ duplicateEmail: true });
    } else {

      if (this.employeeForm.get('email')?.hasError('duplicateEmail')) {
        this.employeeForm.get('email')?.setErrors(null);
      }
    }
  });
}



  initForms() {
    const nameValidators = [
      Validators.required,
      this.capitalizeValidator,
      Validators.pattern(/^[A-Za-z\s]+$/)
    ];

     const emailValidator = [
  Validators.required,
  Validators.pattern(/^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/)
];

    const textOnlyValidator = [
      Validators.required,
      Validators.pattern(/^[A-Za-z\s]+$/),
      this.capitalizeValidator,

    ];

    this.employeeForm = this.fb.group({
      firstName: ['', nameValidators],
      lastName: ['', nameValidators],
      email: ['', emailValidator],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      department: ['', textOnlyValidator],
      jobTitle: ['', textOnlyValidator],
      role: ['', Validators.required],
      status: ['', Validators.required],
       gender: ['', Validators.required],
      joiningDate: [''],
      exitDate: ['']
    });

    this.editForm = this.fb.group({
      firstName: ['', nameValidators],
      lastName: ['', nameValidators],
      email: ['', [
    Validators.required,
    Validators.pattern(/^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/),
    // this.duplicateEmailValidator
  ]],
      phone: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      department: ['', textOnlyValidator],
      jobTitle: ['', textOnlyValidator],
      role: ['', Validators.required],
      status: ['', Validators.required],
       gender: ['', Validators.required],
      joiningDate: ['', Validators.required],
      exitDate: ['']
    });

    this.registerForm = this.fb.group({
      firstName: ['', nameValidators],
      lastName: ['', nameValidators],
      email: ['', emailValidator],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  allowLettersOnly(event: KeyboardEvent) {
    const regex = /^[A-Za-z\s]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  capitalizeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.length > 0 && value[0] !== value[0].toUpperCase()) {
      return { notCapitalized: true };
    }
    return null;
  }

  futureOrTodayDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (control.value && selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getEmployees() {
    this.addEmployeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (err) => {
        console.error('❌ Error fetching employees:', err);
        this.toastr.error('Failed to load employee list');
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedImage = file;
    }
  }

closeAllModals() {
  // Smooth fade-out transition
  document.querySelectorAll('.modal.show').forEach((modalEl: any) => {
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalEl.classList.add('fade');
      setTimeout(() => {
        modalInstance.hide();

        // 🆕 Backdrop manually remove
        document.querySelectorAll('.modal-backdrop').forEach((backdrop: any) => {
          backdrop.remove();
        });

        // 🆕 Body reset
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
      }, 200); // 0.2s delay for smooth fade
    }
  });
}
isDuplicateEmployee(firstName: string, lastName: string): boolean {
  return this.employees.some(
    emp =>
      emp.firstName.toLowerCase() === firstName.toLowerCase() &&
      emp.lastName.toLowerCase() === lastName.toLowerCase()
  );
}
isDuplicateEmail(email: string): boolean {
  return this.employees.some(
    emp => emp.email.toLowerCase() === email.toLowerCase()
  );
}

duplicateEmailValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  const email = control.value.toLowerCase();
  const exists = this.employees.some(emp => emp.email.toLowerCase() === email);
  return exists ? { duplicateEmail: true } : null;
};
isDuplicatePhone(phone: string): boolean {
  return this.employees.some(
    emp => emp.phone === phone
  );
}





    onSubmit() {
    if (this.employeeForm.invalid) {
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }
      const { firstName, lastName, email,phone } = this.employeeForm.value;

  if (this.isDuplicateEmployee(firstName, lastName)) {
    this.toastr.error('Employee already added with this name!');
    return;
  }

     // ✅ Duplicate check (by email)
  if (this.isDuplicateEmail(email)) {
    this.toastr.error('Employee already exists with this email!');
    return;
  }
  // ✅ Duplicate Email Check (STOP API CALL HERE)
  if (this.isDuplicateEmail(email)) {
    this.toastr.error('This Email ID already exists!');
    this.employeeForm.get('email')?.setErrors({ duplicateEmail: true });
    return;
  }
  // ✅ Duplicate check (by phone)
  if (phone && this.isDuplicatePhone(phone)) {
    this.toastr.error('Employee already exists with this phone number!');
    return;
  }

  // ✅ Extra lowercase check
  if (email !== email.toLowerCase()) {
    this.toastr.error('Email must be in small letters only.');
    return;
  }

    const formData = new FormData();
    formData.append('employeeData', JSON.stringify(this.employeeForm.value));
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.addEmployeeService.addEmployeeWithImage(formData).subscribe({
      next: () => {
          this.toastr.success('Employee added successfully!');
        this.closeAllModals();
        this.toastr.success('Employee added successfully!');
        this.employeeForm.reset();
        this.selectedFile = null;
        this.getEmployees();
      },
      error: (err) => {
        console.error(err);
          // ✅ जर backend ने duplicate email error दिला असेल
    if (err.error && typeof err.error === 'string' && err.error.includes('Email already exists')) {
      this.toastr.error('This Email ID already exists!');
    }
    else if (err.error && err.error.message && err.error.message.includes('Email already exists')) {
      this.toastr.error('This Email ID already exists!');
    }
    else {
      this.toastr.error('Failed to add employee.');
    }
  }
});
  }

  onEditSubmit() {

    if (this.editForm.invalid) {
  this.editForm.markAllAsTouched();
  return;
}
const { firstName, lastName } = this.editForm.value;
  const duplicate = this.employees.some(
    emp =>
      emp.id !== this.selectedEmployeeId &&
      emp.firstName.toLowerCase() === firstName.toLowerCase() &&
      emp.lastName.toLowerCase() === lastName.toLowerCase()
  );

  if (duplicate) {
    this.toastr.error('Another employee with the same name already exists!');
    return;
  }
   const { email, phone } = this.editForm.value;

  // Duplicate phone check (exclude current editing employee)
  if (phone && this.employees.some(emp => emp.phone === phone && emp.id !== this.selectedEmployeeId)) {
    this.toastr.error('Another employee already exists with this phone number!');
    return;
  }

    this.addEmployeeService.updateEmployeeWithImage(this.selectedEmployeeId, this.editForm.value).subscribe({
      next: () => {
        this.closeAllModals();
        this.getEmployees();
        this.toastr.success('Employee updated successfully!');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to update employee.');
      }
    });
  }

  openRegisterModal(emp: any) {
    if (!emp) return;

    this.closeAllModals();

    this.selectedEmployeeId = emp.id;
    this.registerForm.patchValue({
      firstName: emp.firstName || '',
      lastName: emp.lastName || '',
      email: emp.email || '',
      role: emp.role || '',
      password: ''
    });

    const modalEl = document.getElementById('registerModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  onRegister() {
  if (!this.selectedEmployeeId || this.registerForm.invalid) {
    this.toastr.error('Please enter password to register.');
    return;
  }

  const registerFormValue = this.registerForm.value;
  const userData = {
    email: registerFormValue.email,   // readonly
    role: registerFormValue.role,     // readonly
    firstName: registerFormValue.firstName, // readonly
    lastName: registerFormValue.lastName,   // readonly
    password: registerFormValue.password,   // only editable field
    employee: { id: this.selectedEmployeeId }
  };

  const formData = new FormData();
  formData.append('userData', JSON.stringify(userData));

  if (this.selectedImage) {
    formData.append('profilePicture', this.selectedImage);
  }

  this.addEmployeeService.registerEmployee(formData).subscribe({
    next: () => {
      this.closeAllModals();
      this.selectedImage = null;
      this.toastr.success('Employee registered successfully!');
      this.getEmployees();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error('Failed to register employee.');
    }
  });
}

  delete(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.addEmployeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.toastr.success('Employee deleted successfully!');
          this.getEmployees();
        },
        error: () => {
          this.toastr.error('Failed to delete employee.');
        }
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.selectedFile = null;
  }
}

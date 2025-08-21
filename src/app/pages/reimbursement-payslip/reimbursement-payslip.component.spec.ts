import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementPayslipComponent } from './reimbursement-payslip.component';

describe('ReimbursementPayslipComponent', () => {
  let component: ReimbursementPayslipComponent;
  let fixture: ComponentFixture<ReimbursementPayslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimbursementPayslipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReimbursementPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

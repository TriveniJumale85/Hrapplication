import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanStatementComponent } from './loan-statement.component';

describe('LoanStatementComponent', () => {
  let component: LoanStatementComponent;
  let fixture: ComponentFixture<LoanStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

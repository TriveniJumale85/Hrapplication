import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGenerateSalaryComponent } from './hr-generate-salary.component';

describe('HrGenerateSalaryComponent', () => {
  let component: HrGenerateSalaryComponent;
  let fixture: ComponentFixture<HrGenerateSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrGenerateSalaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrGenerateSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

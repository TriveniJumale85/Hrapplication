import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAddEmployeeComponent } from './hr-add-employee.component';

describe('HrAddEmployeeComponent', () => {
  let component: HrAddEmployeeComponent;
  let fixture: ComponentFixture<HrAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrAddEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

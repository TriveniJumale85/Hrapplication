import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGenerateSalaryComponent } from './manager-generate-salary.component';

describe('ManagerGenerateSalaryComponent', () => {
  let component: ManagerGenerateSalaryComponent;
  let fixture: ComponentFixture<ManagerGenerateSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerGenerateSalaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerGenerateSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

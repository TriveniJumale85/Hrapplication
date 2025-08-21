import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPyslipComponent } from './manager-pyslip.component';

describe('ManagerPyslipComponent', () => {
  let component: ManagerPyslipComponent;
  let fixture: ComponentFixture<ManagerPyslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerPyslipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerPyslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

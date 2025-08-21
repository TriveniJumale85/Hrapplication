import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceInfoComponent } from './attendance-info.component';

describe('AttendanceInfoComponent', () => {
  let component: AttendanceInfoComponent;
  let fixture: ComponentFixture<AttendanceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

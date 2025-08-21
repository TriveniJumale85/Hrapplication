import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAllLeaveRequestComponent } from './manager-all-leave-request.component';

describe('ManagerAllLeaveRequestComponent', () => {
  let component: ManagerAllLeaveRequestComponent;
  let fixture: ComponentFixture<ManagerAllLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAllLeaveRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerAllLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

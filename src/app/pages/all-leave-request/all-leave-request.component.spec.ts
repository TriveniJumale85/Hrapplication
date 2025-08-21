import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeaveRequestComponent } from './all-leave-request.component';

describe('AllLeaveRequestComponent', () => {
  let component: AllLeaveRequestComponent;
  let fixture: ComponentFixture<AllLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllLeaveRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

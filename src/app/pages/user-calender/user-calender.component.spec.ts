import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCalenderComponent } from './user-calender.component';

describe('UserCalenderComponent', () => {
  let component: UserCalenderComponent;
  let fixture: ComponentFixture<UserCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

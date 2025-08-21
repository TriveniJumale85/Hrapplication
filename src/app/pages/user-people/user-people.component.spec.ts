import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPeopleComponent } from './user-people.component';

describe('UserPeopleComponent', () => {
  let component: UserPeopleComponent;
  let fixture: ComponentFixture<UserPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPeopleComponent } from './hr-people.component';

describe('HrPeopleComponent', () => {
  let component: HrPeopleComponent;
  let fixture: ComponentFixture<HrPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
